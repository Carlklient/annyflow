import { SITE, formatInquiryText } from "@/lib/constants";
import type { ContactPayload } from "@/lib/notify-client";

export type InquiryPayload = ContactPayload;

export type NotifyResult = {
  email: boolean;
  provider?: string;
  error?: string;
};

function interestLabel(interest?: string) {
  const map: Record<string, string> = {
    automation: "Business Automation",
    phone: "Business Phone Systems",
    outbound: "Outbound Calling Infrastructure",
    other: "General inquiry",
  };
  return interest ? map[interest] || interest : "—";
}

async function sendViaWeb3Forms(payload: InquiryPayload): Promise<NotifyResult> {
  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) return { email: false, error: "Web3Forms not configured." };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `AnnyFlow inquiry from ${payload.name}`,
      from_name: "AnnyFlow Website",
      name: payload.name,
      email: payload.email,
      company: payload.company || "—",
      interest: interestLabel(payload.interest),
      message: payload.message,
      botcheck: "",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  return {
    email: Boolean(data.success),
    provider: "web3forms",
    error: data.success ? undefined : data.message || "Web3Forms failed.",
  };
}

async function sendViaResend(payload: InquiryPayload): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { email: false, error: "Resend not configured." };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "AnnyFlow Contact <onboarding@resend.dev>",
      to: [SITE.email],
      reply_to: payload.email,
      subject: `AnnyFlow inquiry from ${payload.name}`,
      text: formatInquiryText(payload),
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    return { email: false, provider: "resend", error: err || "Resend failed." };
  }

  return { email: true, provider: "resend" };
}

async function notifyTelegram(payload: InquiryPayload): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!botToken || !chatId) return;

  const text = [
    "🆕 AnnyFlow inquiry",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Interest: ${interestLabel(payload.interest)}`,
    "",
    payload.message,
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });
}

async function notifyDiscord(payload: InquiryPayload): Promise<void> {
  const webhook = process.env.DISCORD_WEBHOOK_URL?.trim();
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `**New AnnyFlow inquiry** from **${payload.name}** (${payload.email})`,
      embeds: [
        {
          title: interestLabel(payload.interest),
          description: payload.message.slice(0, 1800),
          color: 0x10b981,
          fields: [
            { name: "Company", value: payload.company || "—", inline: true },
            { name: "Email", value: payload.email, inline: true },
          ],
        },
      ],
    }),
  });
}

async function sendViaFormSubmit(payload: InquiryPayload): Promise<NotifyResult> {
  const to = SITE.email;
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company || "—",
      interest: interestLabel(payload.interest),
      message: payload.message,
      _subject: `AnnyFlow inquiry from ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    return { email: false, provider: "formsubmit", error: "FormSubmit failed." };
  }

  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
  const ok = data.success === "true" || data.success === true;
  return {
    email: ok,
    provider: "formsubmit",
    error: ok ? undefined : "FormSubmit rejected the submission.",
  };
}

/** Chat alerts only (Telegram / Discord). Safe to call after client-side email delivery. */
export async function notifyLeadAlerts(payload: InquiryPayload): Promise<void> {
  await Promise.allSettled([notifyTelegram(payload), notifyDiscord(payload)]);
}

/** Server-side delivery: Resend → Web3Forms → FormSubmit, plus optional chat alerts. */
export async function notifyOwner(payload: InquiryPayload): Promise<NotifyResult> {
  let result: NotifyResult = {
    email: false,
    error: "No server email provider configured or reachable.",
  };

  for (const send of [sendViaResend, sendViaWeb3Forms, sendViaFormSubmit]) {
    try {
      const next = await send(payload);
      if (next.email) {
        result = next;
        break;
      }
      result = next;
    } catch {
      /* try next */
    }
  }

  await notifyLeadAlerts(payload);

  return result;
}
