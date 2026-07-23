"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSpreadsheet, Headphones, Phone, PhoneCall } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Full loop length — cards re-enter from directions like a video */
const LOOP_MS = 9000;

const CARDS = [
  {
    id: "phone",
    src: "/images/hero/phone.png",
    alt: "Business VoIP telephone",
    title: "Business Phone",
    detail: "IVR · Queues · CRM sync",
    icon: Phone,
    className:
      "left-0 top-[8%] w-[42%] sm:w-[34%] lg:left-[2%] lg:top-[12%] lg:w-[26%]",
    from: { x: -90, y: 0 },
    delay: 0,
  },
  {
    id: "sheets",
    src: "/images/hero/spreadsheet.png",
    alt: "Spreadsheet dashboard on laptop",
    title: "Spreadsheets",
    detail: "Excel · Sheets · Live reports",
    icon: FileSpreadsheet,
    className:
      "right-0 top-[4%] w-[42%] sm:w-[34%] lg:right-[2%] lg:top-[8%] lg:w-[26%]",
    from: { x: 90, y: 0 },
    delay: 0.12,
  },
  {
    id: "dialer",
    src: "/images/hero/dialer.png",
    alt: "Outbound dialer on smartphone",
    title: "Outbound Dialer",
    detail: "Predictive · Progressive · AI",
    icon: PhoneCall,
    className:
      "bottom-[2%] right-[4%] w-[40%] sm:w-[32%] lg:bottom-[6%] lg:right-[6%] lg:w-[24%]",
    from: { x: 0, y: 70 },
    delay: 0.24,
  },
] as const;

function DialerOverlay({ tick }: { tick: number }) {
  const phases = ["Dialing…", "Connecting…", "Live call"] as const;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const a = window.setTimeout(() => setPhase(1), 700);
    const b = window.setTimeout(() => setPhase(2), 1500);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [tick]);

  return (
    <div className="absolute inset-x-[16%] top-[14%] bottom-[20%] z-10 flex flex-col items-center rounded-[14%] bg-white/95 px-2 pt-3 text-center shadow-md backdrop-blur-sm sm:inset-x-[18%] sm:top-[16%]">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${tick}-${phases[phase]}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-[9px] font-bold text-primary sm:text-[10px]"
        >
          {phases[phase]}
        </motion.p>
      </AnimatePresence>
      <motion.p
        key={`num-${tick}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="mt-1 font-display text-[10px] font-bold text-dark sm:text-[11px]"
      >
        +1 (555) 128-2040
      </motion.p>
      <div className="mt-2 h-1 w-[75%] overflow-hidden rounded-full bg-dark/10">
        <motion.div
          key={`bar-${tick}-${phase}`}
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: phase === 0 ? "30%" : phase === 1 ? "65%" : "100%" }}
          transition={{ duration: 0.55, ease: EASE }}
        />
      </div>
      {phase === 2 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-[8px] font-medium text-muted"
        >
          Lead scored · CRM updated
        </motion.p>
      ) : null}
    </div>
  );
}

function PhoneOverlay({ tick }: { tick: number }) {
  const [waiting, setWaiting] = useState(0);
  useEffect(() => {
    setWaiting(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setWaiting(n);
      if (n >= 12) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [tick]);

  return (
    <div className="absolute inset-x-[36%] top-[20%] bottom-[40%] z-10 overflow-hidden rounded-sm bg-[#064E3B]/95 p-1.5">
      <motion.div
        key={`q-${tick}`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-1 h-1 rounded-sm bg-primary"
      />
      <p className="text-[7px] font-semibold text-white/80">Queue: Sales</p>
      <p className="text-[9px] font-bold text-white">{waiting} waiting</p>
    </div>
  );
}

function SheetOverlay({ tick }: { tick: number }) {
  return (
    <div className="absolute inset-x-[12%] top-[16%] bottom-[26%] z-10 grid grid-cols-4 items-end gap-0.5 p-1">
      {[55, 72, 48, 90, 65, 85, 40, 78].map((h, i) => (
        <motion.div
          key={`${tick}-${i}`}
          className="rounded-sm bg-primary/70"
          initial={{ height: "6%" }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
        />
      ))}
    </div>
  );
}

export function HeroIllustration() {
  /** Remount key — forces the whole scene to replay like a looping video */
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, LOOP_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(16,185,129,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl sm:aspect-[16/10]">
          {/* Animated connectors — replay each loop */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox="0 0 1000 620"
            fill="none"
            aria-hidden
          >
            {[
              "M180 160 C 320 120, 400 200, 500 280",
              "M820 140 C 700 160, 620 220, 540 300",
              "M780 480 C 680 420, 600 380, 540 340",
              "M220 420 C 340 400, 420 360, 500 320",
            ].map((d, i) => (
              <motion.path
                key={`${tick}-path-${i}`}
                d={d}
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.65 }}
                transition={{ duration: 1.1, delay: 0.85 + i * 0.1, ease: EASE }}
              />
            ))}
          </svg>

          {/* Main scene — from bottom each loop */}
          <motion.div
            key={`${tick}-scene`}
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute top-[18%] left-1/2 z-[2] w-[88%] max-w-[720px] -translate-x-1/2 sm:top-[16%] sm:w-[72%]"
          >
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
                <motion.div
                  initial={{ opacity: 0, x: -36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.45, ease: EASE }}
                  className="rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:px-4 sm:py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Headphones className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-dark sm:text-sm">
                        Call center live
                      </p>
                      <p className="text-[10px] text-muted sm:text-xs">
                        Agents · CRM · Real-time dashboard
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65, duration: 0.45, ease: EASE }}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-dark px-3 py-1.5 text-[10px] font-semibold text-white sm:self-auto sm:text-xs"
                >
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  42 active lines · syncing
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating cards — left / right / bottom every loop */}
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={`${tick}-${card.id}`}
                initial={{ opacity: 0, x: card.from.x, y: card.from.y, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.2 + card.delay,
                  ease: EASE,
                }}
                className={`absolute z-[4] ${card.className}`}
              >
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
                    {card.id === "dialer" ? <DialerOverlay tick={tick} /> : null}
                    {card.id === "phone" ? <PhoneOverlay tick={tick} /> : null}
                    {card.id === "sheets" ? <SheetOverlay tick={tick} /> : null}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + card.delay, duration: 0.35 }}
                    className="border-t border-border/80 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3"
                  >
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
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            key={`${tick}-chip-l`}
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.45, ease: EASE }}
            className="absolute bottom-[18%] left-[2%] z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft sm:block lg:bottom-[22%] lg:left-[8%]"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
            Sheet → CRM auto-sync
          </motion.div>
          <motion.div
            key={`${tick}-chip-r`}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.45, ease: EASE }}
            className="absolute top-[42%] right-0 z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft lg:right-[4%] lg:block"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent" />
            Dialer ↔ Phone queue
          </motion.div>
        </div>

        {/* Loop progress — proves animation is running */}
        <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-border">
          <motion.div
            key={`progress-${tick}`}
            className="h-full origin-left rounded-full bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: LOOP_MS / 1000, ease: "linear" }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          Phones, spreadsheets, call centers, and dialers—connected in one live operation.
        </p>
      </div>
    </div>
  );
}
