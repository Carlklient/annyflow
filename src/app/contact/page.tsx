import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation with AnnyFlow via form, WhatsApp, Telegram, Discord, or email.",
  openGraph: {
    title: "Contact · AnnyFlow",
    description:
      "Book a consultation with AnnyFlow via form, WhatsApp, Telegram, Discord, or email.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
