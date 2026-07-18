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

/** Server-side delivery: Resend → Web3Forms. */
export async function notifyOwner(payload: InquiryPayload): Promise<NotifyResult> {
  for (const send of [sendViaResend, sendViaWeb3Forms]) {
    try {
      const result = await send(payload);
      if (result.email) return result;
    } catch {
      /* try next */
    }
  }

  return { email: false, error: "No server email provider configured or reachable." };
}
