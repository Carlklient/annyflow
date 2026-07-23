/**
 * Central contact & social config.
 * Override any value with NEXT_PUBLIC_* env vars in `.env.local`.
 */
export const SITE = {
  name: "AnnyFlow",
  tagline: "Business Automation · Spreadsheets · Phone Systems · Outbound Calling",
  description:
    "AnnyFlow builds enterprise-grade business automation, spreadsheet systems, business phone systems, and outbound calling infrastructure for modern companies.",
  url: (() => {
    const fallback = "https://annyflow.vercel.app";
    const raw = (process.env.NEXT_PUBLIC_SITE_URL || fallback).trim();
    try {
      return new URL(raw).origin;
    } catch {
      return fallback;
    }
  })(),
  email: process.env.NEXT_PUBLIC_EMAIL || "mercyanny2020@gmail.com",
  /** Digits only, country code included — from https://wa.me/13869659310 */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP || "13869659310").replace(
    /\D/g,
    ""
  ),
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+1 (386) 965-9310",
  /** https://t.me/siptrunkinng */
  telegram: (process.env.NEXT_PUBLIC_TELEGRAM || "siptrunkinng").replace(/^@/, ""),
  /** Discord username (not an invite code) */
  discordUsername: (process.env.NEXT_PUBLIC_DISCORD_USERNAME || "cloudof9").replace(
    /^@/,
    ""
  ),
  founder: "Annybest",
  /** Free Cal.com booking link */
  bookingUrl: (
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "https://cal.com/annyflow-e7ey2d/30min"
  ).trim(),
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type ContactChannel = {
  id: "whatsapp" | "telegram" | "discord" | "email";
  label: string;
  href: string;
  color: string;
  /** When set, click copies this value (used for Discord username) */
  copyValue?: string;
};

function buildChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (SITE.whatsappNumber) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
        "Hi AnnyFlow — I'd like to book a consultation."
      )}`,
      color: "#25D366",
    });
  }

  if (SITE.telegram) {
    channels.push({
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/${SITE.telegram}`,
      color: "#26A5E4",
    });
  }

  if (SITE.discordUsername) {
    channels.push({
      id: "discord",
      label: "Discord",
      // Discord has no public profile URL for usernames — copy + open Discord app
      href: "https://discord.com/app",
      copyValue: SITE.discordUsername,
      color: "#5865F2",
    });
  }

  channels.push({
    id: "email",
    label: "Email",
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("AnnyFlow consultation request")}`,
    color: "#10B981",
  });

  return channels;
}

export const CONTACT_CHANNELS = buildChannels();

export const TECH_LOGOS = [
  "Make",
  "n8n",
  "Zapier",
  "Excel",
  "Google Sheets",
  "Airtable",
  "3CX",
  "Vicidial",
  "HubSpot",
  "Salesforce",
  "Zoho",
  "Twilio",
  "Notion",
  "ClickUp",
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  solutions: [
    { href: "/solutions#business-automation", label: "Business Automation" },
    { href: "/solutions#spreadsheet-automation", label: "Spreadsheet Automation" },
    { href: "/solutions#business-phone-systems", label: "Business Phone Systems" },
    { href: "/solutions#outbound-calling", label: "Outbound Calling" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
} as const;

const INTEREST_LABEL: Record<string, string> = {
  automation: "Business Automation",
  spreadsheet: "Spreadsheet Automation",
  phone: "Business Phone Systems",
  outbound: "Outbound Calling Infrastructure",
  other: "General inquiry",
};

export function formatInquiryText(params: {
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
}) {
  return [
    `New AnnyFlow consultation request`,
    ``,
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    params.company ? `Company: ${params.company}` : null,
    params.interest
      ? `Interest: ${INTEREST_LABEL[params.interest] || params.interest}`
      : null,
    ``,
    params.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function buildMailto(params: {
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
}) {
  const subject = `AnnyFlow inquiry from ${params.name}`;
  const body = formatInquiryText(params);
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
