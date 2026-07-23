import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact & Free Consultation",
  description:
    "Book a free AnnyFlow consultation. Ask about business automation, spreadsheet systems, phone systems, or outbound dialers via form, WhatsApp, Telegram, Discord, or email.",
  openGraph: {
    title: "Contact | AnnyFlow",
    description:
      "Book a consultation with AnnyFlow via form, WhatsApp, Telegram, Discord, or email.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
