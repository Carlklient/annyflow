"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, Headphones, Phone, PhoneCall } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOAT_CARDS = [
  {
    id: "phone",
    src: "/images/hero/phone.png",
    alt: "Business VoIP telephone",
    title: "Business Phone",
    detail: "IVR · Queues · CRM sync",
    icon: Phone,
    className:
      "left-0 top-[8%] w-[42%] sm:w-[34%] lg:left-[2%] lg:top-[12%] lg:w-[26%]",
    /** Pass-On style: enter from left */
    enter: { x: -72, y: 0 },
    delay: 0.35,
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
    /** enter from right */
    enter: { x: 72, y: 0 },
    delay: 0.48,
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
    /** enter from bottom */
    enter: { x: 0, y: 64 },
    delay: 0.62,
  },
] as const;

function CountUp({
  to,
  active,
  suffix = "",
}: {
  to: number;
  active: boolean;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const frames = 28;
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((to * frame) / frames));
      if (frame >= frames) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [active, to]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

function DialerScreenContent({ active, reduce }: { active: boolean; reduce: boolean | null }) {
  const steps = ["Dialing…", "Connecting…", "Live call"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active || reduce) {
      setStep(2);
      return;
    }
    setStep(0);
    const t1 = window.setTimeout(() => setStep(1), 900);
    const t2 = window.setTimeout(() => setStep(2), 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active, reduce]);

  return (
    <div className="absolute inset-x-[18%] top-[16%] bottom-[22%] flex flex-col items-center justify-start rounded-[12%] bg-white/90 px-2 pt-3 text-center shadow-inner backdrop-blur-[2px] sm:inset-x-[20%] sm:top-[18%] sm:pt-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={steps[step]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          className="text-[9px] font-semibold text-primary sm:text-[10px]"
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0, scale: 0.92 }}
        animate={active ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
        className="mt-1 font-display text-[11px] font-bold tracking-tight text-dark sm:text-xs"
      >
        +1 (555) 128-2040
      </motion.p>
      <motion.div
        className="mt-2 h-1 w-[70%] overflow-hidden rounded-full bg-dark/10"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : undefined}
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={active ? { width: step === 2 ? "100%" : step === 1 ? "62%" : "28%" } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </motion.div>
      {step === 2 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1.5 text-[8px] font-medium text-muted sm:text-[9px]"
        >
          Lead scored · CRM updated
        </motion.p>
      ) : null}
    </div>
  );
}

function PhoneScreenContent({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-[38%] top-[22%] bottom-[42%] overflow-hidden rounded-sm">
      <motion.div
        className="flex h-full flex-col gap-1 bg-[#064E3B]/95 p-1.5"
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.55, duration: 0.4, ease: EASE }}
      >
        <motion.div
          className="h-1.5 rounded-sm bg-primary/80"
          initial={{ width: "0%" }}
          animate={active ? { width: "100%" } : undefined}
          transition={{ delay: 0.7, duration: 0.6 }}
        />
        <motion.p
          className="text-[7px] font-semibold text-white/90"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : undefined}
          transition={{ delay: 0.85 }}
        >
          Queue: Sales
        </motion.p>
        <motion.p
          className="text-[8px] font-bold text-white"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : undefined}
          transition={{ delay: 1 }}
        >
          <CountUp to={12} active={active} suffix=" waiting" />
        </motion.p>
      </motion.div>
    </div>
  );
}

function SheetScreenContent({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-[14%] top-[18%] bottom-[28%] overflow-hidden rounded-md">
      <motion.div
        className="grid h-full grid-cols-3 gap-0.5 p-1"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : undefined}
        transition={{ delay: 0.6 }}
      >
        {[72, 48, 91, 35, 88, 64].map((w, i) => (
          <motion.div
            key={i}
            className="rounded-[2px] bg-primary/25"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={active ? { scaleY: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.75 + i * 0.08, duration: 0.35, ease: EASE }}
            style={{ originY: 1, height: `${40 + (w % 40)}%`, alignSelf: "end" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function HeroIllustration() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduce ? 0 : 200);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(16,185,129,0.12),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="relative mx-auto aspect-[16/11] w-full max-w-5xl sm:aspect-[16/10]">
          {/* Connection paths — draw after cards land */}
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
                key={d}
                d={d}
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  ready
                    ? { pathLength: 1, opacity: 0.55 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.95 + i * 0.12,
                  ease: EASE,
                }}
              />
            ))}
          </svg>

          {/* Featured call-center scene — loads from below */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="absolute top-[18%] left-1/2 z-[2] w-[88%] max-w-[720px] -translate-x-1/2 sm:top-[16%] sm:w-[72%]"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_24px_80px_rgba(17,24,39,0.12)] sm:rounded-[1.75rem]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/hero/scene.png"
                  alt="Call center agent with CRM dashboard, headset, and phone systems connected"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 720px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-2 p-3 sm:flex-row sm:items-end sm:justify-between sm:p-5">
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85, duration: 0.45, ease: EASE }}
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
                  initial={reduce ? false : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.95, duration: 0.45, ease: EASE }}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-dark px-3 py-1.5 text-[10px] font-semibold text-white sm:self-auto sm:px-3.5 sm:text-xs"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  <CountUp to={42} active={ready} /> active lines · syncing
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating cards — directional load, no bounce loop */}
          {FLOAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: card.enter.x, y: card.enter.y, scale: 0.96 }
                }
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: card.delay, ease: EASE }}
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
                    />
                    {card.id === "dialer" ? (
                      <DialerScreenContent active={ready} reduce={reduce} />
                    ) : null}
                    {card.id === "phone" ? <PhoneScreenContent active={ready} /> : null}
                    {card.id === "sheets" ? <SheetScreenContent active={ready} /> : null}
                  </div>
                  <motion.div
                    className="border-t border-border/80 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay + 0.35, duration: 0.4, ease: EASE }}
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

          {/* Status chips — load left / right */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.5, ease: EASE }}
            className="absolute bottom-[18%] left-[2%] z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft sm:block lg:bottom-[22%] lg:left-[8%]"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
            Sheet → CRM auto-sync
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.5, ease: EASE }}
            className="absolute top-[42%] right-0 z-[5] hidden rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-dark shadow-soft lg:right-[4%] lg:block"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent" />
            Dialer ↔ Phone queue
          </motion.div>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.45, ease: EASE }}
          className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-muted sm:mt-10"
        >
          See how phones, spreadsheets, call centers, and dialers connect into one
          AnnyFlow operation—built to feel like a product, not a patchwork.
        </motion.p>
      </div>
    </div>
  );
}
