"use client";

import { useEffect, useState, type CSSProperties, type ComponentType, type MouseEvent, type SVGProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
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

const ORDER = ["whatsapp", "telegram", "discord", "email"] as const;

export function SocialRail() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const channels = [...CONTACT_CHANNELS].sort(
    (a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id),
  );

  // Collapse when navigating; hide expanded stack on contact (pills already there)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const onDiscordClick = async (
    e: MouseEvent<HTMLAnchorElement>,
    username: string,
  ) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
    window.open("https://discord.com/app", "_blank", "noopener,noreferrer");
  };

  const hideMobileFab = pathname === "/contact";

  return (
    <>
      {/* Desktop rail */}
      <aside
        aria-label="Social contact channels"
        className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:block lg:right-6"
      >
        <ul className="pointer-events-auto relative flex flex-col items-end gap-4">
          <span
            aria-hidden
            className="absolute top-3 right-[21px] bottom-3 w-px bg-gradient-to-b from-transparent via-dark/15 to-transparent"
          />

          {channels.map((channel, index) => {
            const Icon = ICONS[channel.id] ?? EmailIcon;
            const isMail = channel.id === "email";
            const label =
              channel.id === "discord" && copied
                ? "Copied!"
                : channel.id === "discord"
                  ? `Discord · ${channel.copyValue}`
                  : channel.label;

            return (
              <motion.li
                key={channel.id}
                initial={{ opacity: 0, x: 28, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <a
                  href={channel.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  onClick={
                    channel.copyValue
                      ? (e) => onDiscordClick(e, channel.copyValue!)
                      : undefined
                  }
                  aria-label={label}
                  className={cn(
                    "social-float group relative flex size-12 items-center justify-center rounded-full",
                    "text-white outline-none transition-transform duration-300",
                    "hover:-translate-x-1 hover:scale-110 focus-visible:-translate-x-1 focus-visible:scale-110",
                  )}
                  style={
                    {
                      backgroundColor: channel.color,
                      "--social-color": channel.color,
                    } as CSSProperties
                  }
                >
                  <Icon className="relative z-10 size-[22px]" title="" />

                  <span
                    className={cn(
                      "pointer-events-none absolute top-1/2 right-[calc(100%+14px)] z-20 -translate-y-1/2",
                      "flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2",
                      "bg-dark font-display text-[11px] font-semibold tracking-wide text-white uppercase",
                      "opacity-0 shadow-[0_10px_30px_rgba(17,24,39,0.22)] transition-all duration-300",
                      "translate-x-2 group-hover:translate-x-0 group-hover:opacity-100",
                      "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                    )}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: channel.color }}
                      aria-hidden
                    />
                    {label}
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile: single FAB that expands */}
      {!hideMobileFab && (
        <div className="fixed right-3 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2.5 md:hidden">
          <AnimatePresence>
            {mobileOpen &&
              channels.map((channel, index) => {
                const Icon = ICONS[channel.id] ?? EmailIcon;
                const isMail = channel.id === "email";
                return (
                  <motion.a
                    key={`m-${channel.id}`}
                    href={channel.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (channel.copyValue) onDiscordClick(e, channel.copyValue);
                      setMobileOpen(false);
                    }}
                    aria-label={channel.label}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ delay: index * 0.04, duration: 0.22 }}
                    className="social-float flex size-12 items-center justify-center rounded-full text-white active:scale-95"
                    style={
                      {
                        backgroundColor: channel.color,
                        "--social-color": channel.color,
                      } as CSSProperties
                    }
                  >
                    <Icon className="size-5" title="" />
                  </motion.a>
                );
              })}
          </AnimatePresence>

          <button
            type="button"
            aria-label={mobileOpen ? "Close contact menu" : "Open contact menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "social-float flex size-14 items-center justify-center rounded-full text-white active:scale-95",
              mobileOpen ? "bg-dark" : "bg-primary",
            )}
            style={
              {
                "--social-color": mobileOpen ? "#111827" : "#10B981",
              } as CSSProperties
            }
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </button>
        </div>
      )}
    </>
  );
}
