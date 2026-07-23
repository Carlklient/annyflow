"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FileSpreadsheet, Headphones, Phone, PhoneCall } from "lucide-react";

const CARDS = [
  {
    id: "phone",
    src: "/images/hero/phone.png",
    alt: "Business VoIP telephone",
    title: "Business Phone",
    detail: "IVR, Queues, CRM sync",
    icon: Phone,
    className:
      "left-0 top-[8%] w-[42%] sm:w-[34%] lg:left-[2%] lg:top-[12%] lg:w-[26%]",
    driftClass: "hero-drift-a",
  },
  {
    id: "sheets",
    src: "/images/hero/spreadsheet.png",
    alt: "Spreadsheet dashboard on laptop",
    title: "Spreadsheets",
    detail: "Excel, Sheets, Live reports",
    icon: FileSpreadsheet,
    className:
      "right-0 top-[4%] w-[42%] sm:w-[34%] lg:right-[2%] lg:top-[8%] lg:w-[26%]",
    driftClass: "hero-drift-b",
  },
  {
    id: "dialer",
    src: "/images/hero/dialer.png",
    alt: "Outbound dialer on smartphone",
    title: "Outbound Dialer",
    detail: "Predictive, Progressive, AI",
    icon: PhoneCall,
    className:
      "bottom-[2%] right-[4%] w-[40%] sm:w-[32%] lg:bottom-[6%] lg:right-[6%] lg:w-[24%]",
    driftClass: "hero-drift-c",
  },
] as const;

function DialerOverlay() {
  const phases = ["Dialing…", "Connecting…", "Live call"] as const;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % phases.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [phases.length]);

  return (
    <div className="absolute inset-x-[16%] top-[14%] bottom-[20%] z-10 flex flex-col items-center rounded-[14%] bg-white/95 px-2 pt-3 text-center shadow-md backdrop-blur-sm sm:inset-x-[18%] sm:top-[16%]">
      <p className="text-[9px] font-bold text-primary sm:text-[10px]">
        {phases[phase]}
      </p>
      <p className="mt-1 font-display text-[10px] font-bold text-dark sm:text-[11px]">
        +1 (555) 128-2040
      </p>
      {phase === 2 ? (
        <p className="mt-1 text-[8px] font-medium text-muted">
          Lead scored, CRM updated
        </p>
      ) : (
        <p className="mt-1 text-[8px] font-medium text-muted">Updating CRM…</p>
      )}
    </div>
  );
}

function PhoneOverlay() {
  const [waiting, setWaiting] = useState(8);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWaiting((n) => (n >= 14 ? 5 : n + 1));
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-x-[36%] top-[20%] bottom-[40%] z-10 overflow-hidden rounded-sm bg-[#064E3B]/95 p-1.5">
      <p className="text-[7px] font-semibold text-white/80">Queue: Sales</p>
      <p className="text-[9px] font-bold text-white">{waiting} waiting</p>
    </div>
  );
}

function SheetOverlay() {
  const heights = [55, 72, 48, 90, 65, 85, 40, 78];

  return (
    <div className="absolute inset-x-[12%] top-[16%] bottom-[26%] z-10 grid grid-cols-4 items-end gap-0.5 p-1">
      {heights.map((h, i) => (
        <div
          key={i}
          className="rounded-sm bg-primary/70"
          style={{
            height: `${h}%`,
            animation: `hero-bar-pulse ${2.2 + i * 0.2}s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(16,185,129,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl sm:aspect-[16/10]">
          {/* Center scene: already visible, always drifting */}
          <div className="absolute top-[18%] left-1/2 z-[2] w-[88%] max-w-[720px] -translate-x-1/2 sm:top-[16%] sm:w-[72%]">
            <div className="hero-drift-center">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_24px_80px_rgba(17,24,39,0.12)] sm:rounded-[1.75rem]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/hero/scene.png"
                    alt="Call center agent with CRM dashboard"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 720px"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-2 p-3 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                  <div className="rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:px-4 sm:py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Headphones className="size-4" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-dark sm:text-sm">
                          Call center live
                        </p>
                        <p className="text-[10px] text-muted sm:text-xs">
                          Agents, CRM, Real time dashboard
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-dark px-3 py-1.5 text-[10px] font-semibold text-white sm:self-auto sm:text-xs">
                    <span className="hero-live-dot size-1.5 rounded-full bg-primary" />
                    42 active lines syncing
                  </div>
                </div>
              </div>
            </div>
          </div>

          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`absolute z-[4] ${card.className}`}
              >
                <div className={card.driftClass}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_48px_rgba(17,24,39,0.12)] sm:rounded-[1.25rem]">
                    <div className="relative aspect-square w-full bg-[#F8FAFC]">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 1024px) 40vw, 240px"
                        className="object-cover p-2 sm:p-3"
                        priority
                      />
                      {card.id === "dialer" ? <DialerOverlay /> : null}
                      {card.id === "phone" ? <PhoneOverlay /> : null}
                      {card.id === "sheets" ? <SheetOverlay /> : null}
                    </div>
                    <div className="border-t border-border/80 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-3.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-dark sm:text-sm">
                            {card.title}
                          </p>
                          <p className="truncate text-[10px] text-muted sm:text-[11px]">
                            {card.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="hero-drift-a absolute bottom-[18%] left-[2%] z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft sm:block lg:bottom-[22%] lg:left-[8%]">
            <span className="hero-live-dot mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
            Sheet to CRM auto sync
          </div>
          <div className="hero-drift-b absolute top-[42%] right-0 z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft lg:right-[4%] lg:block">
            <span className="hero-live-dot mr-1.5 inline-block size-1.5 rounded-full bg-accent" />
            Dialer and Phone queue
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Phones, spreadsheets, call centers, and dialers connected in one live operation.
        </p>
      </div>
    </div>
  );
}
