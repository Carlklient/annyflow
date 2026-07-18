"use client";

import { useState, type ComponentType, type MouseEvent, type SVGProps } from "react";
import { CONTACT_CHANNELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  WhatsAppIcon,
  TelegramIcon,
  DiscordIcon,
  EmailIcon,
} from "@/components/icons/BrandIcons";

type BrandIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;

const ICONS: Record<string, BrandIcon> = {
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  discord: DiscordIcon,
  email: EmailIcon,
};

type ContactPillsProps = {
  className?: string;
  size?: "sm" | "md";
};

export function ContactPills({ className, size = "md" }: ContactPillsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const onChannelClick = async (
    e: MouseEvent<HTMLAnchorElement>,
    copyValue?: string,
    id?: string
  ) => {
    if (!copyValue) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopiedId(id || copyValue);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* ignore */
    }
    window.open("https://discord.com/app", "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {CONTACT_CHANNELS.map((channel) => {
        const Icon = ICONS[channel.id] ?? EmailIcon;
        const isMail = channel.id === "email";
        const isCopy = Boolean(channel.copyValue);
        const showCopied = copiedId === channel.id;

        return (
          <a
            key={channel.id}
            href={channel.href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            onClick={
              isCopy
                ? (e) => onChannelClick(e, channel.copyValue, channel.id)
                : undefined
            }
            title={
              isCopy
                ? `Copy Discord username: ${channel.copyValue}`
                : channel.label
            }
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border border-border bg-white/90 text-text shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lift focus-ring",
              size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs"
            )}
          >
            <span
              className="flex size-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${channel.color}18`, color: channel.color }}
            >
              <Icon className="size-3.5" title="" />
            </span>
            <span className="font-medium">
              {showCopied
                ? "Copied!"
                : isCopy
                  ? `Discord · ${channel.copyValue}`
                  : channel.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
