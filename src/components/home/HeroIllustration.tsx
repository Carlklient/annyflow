"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FileSpreadsheet,
  Headphones,
  Phone,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 4200;

type Slide = {
  id: string;
  step: number;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  /** Direction the phone mock enters from */
  from: "left" | "right" | "up" | "down";
  screen: "phone" | "sheet" | "callcenter" | "dialer";
};

const SLIDES: Slide[] = [
  {
    id: "phone",
    step: 1,
    title: "Business phone systems",
    body: "IVR, queues, and CRM-linked call handling—so every customer reaches the right agent.",
    image: "/images/hero/phone.png",
    imageAlt: "Business VoIP desk phone",
    icon: Phone,
    from: "left",
    screen: "phone",
  },
  {
    id: "sheets",
    step: 2,
    title: "Spreadsheet automation",
    body: "Excel and Google Sheets dashboards that refresh themselves—no more manual copy-paste.",
    image: "/images/hero/spreadsheet.png",
    imageAlt: "Laptop with spreadsheet dashboard",
    icon: FileSpreadsheet,
    from: "right",
    screen: "sheet",
  },
  {
    id: "callcenter",
    step: 3,
    title: "Call center operations",
    body: "Live agent desktops, headsets, and real-time dashboards connected to your CRM.",
    image: "/images/hero/scene.png",
    imageAlt: "Call center agent with CRM dashboard",
    icon: Headphones,
    from: "up",
    screen: "callcenter",
  },
  {
    id: "dialer",
    step: 4,
    title: "Outbound dialing",
    body: "Predictive and progressive dialers that update leads the moment a call connects.",
    image: "/images/hero/dialer.png",
    imageAlt: "Outbound dialer on smartphone",
    icon: PhoneCall,
    from: "down",
    screen: "dialer",
  },
];

const enterOffset = {
  left: { x: -120, y: 0 },
  right: { x: 120, y: 0 },
  up: { x: 0, y: -80 },
  down: { x: 0, y: 80 },
} as const;

function PhoneLiveUI({ active }: { active: boolean }) {
  const [lines, setLines] = useState(0);
  useEffect(() => {
    if (!active) return;
    setLines(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setLines(Math.min(12, n));
      if (n >= 12) window.clearInterval(id);
    }, 80);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-[#064E3B] p-4 text-white sm:p-5">
      <div>
        <p className="text-[10px] font-semibold tracking-wide text-primary-light uppercase">
          Queue · Sales
        </p>
        <motion.p
          key={lines}
          className="mt-2 font-display text-3xl font-semibold"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
        >
          {lines} waiting
        </motion.p>
      </div>
      <div className="space-y-2">
        {["IVR routing", "CRM popup", "Recording on"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -16 }}
            animate={active ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.35, ease: EASE }}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SheetLiveUI({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 sm:p-5">
      <p className="text-[10px] font-semibold tracking-wide text-primary uppercase">
        Ops sheet · live
      </p>
      <div className="mt-3 flex flex-1 items-end gap-1.5">
        {[42, 68, 55, 88, 72, 95, 60, 80].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-primary"
            initial={{ height: "8%" }}
            animate={active ? { height: `${h}%` } : undefined}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: EASE }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.7 }}
        className="mt-3 text-xs text-muted"
      >
        Rows refreshed · formulas synced
      </motion.p>
    </div>
  );
}

function CallLiveUI({ active }: { active: boolean }) {
  const [agents, setAgents] = useState(0);
  useEffect(() => {
    if (!active) return;
    setAgents(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 3;
      setAgents(Math.min(42, n));
      if (n >= 42) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl">
      <Image
        src="/images/hero/scene.png"
        alt=""
        fill
        className="object-cover"
        sizes="320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-[10px] font-semibold tracking-wide text-primary uppercase">
          Call center
        </p>
        <p className="mt-1 font-display text-2xl font-semibold">
          {agents} active lines
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : undefined}
          transition={{ delay: 0.5 }}
          className="mt-1 text-xs text-white/70"
        >
          Headset · CRM · Live dashboard
        </motion.p>
      </div>
    </div>
  );
}

function DialerLiveUI({ active }: { active: boolean }) {
  const phases = ["Dialing…", "Ringing…", "Connected"] as const;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    setPhase(0);
    const t1 = window.setTimeout(() => setPhase(1), 900);
    const t2 = window.setTimeout(() => setPhase(2), 1800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active]);

  return (
    <div className="flex h-full flex-col items-center justify-between rounded-2xl bg-[#111827] p-5 text-center text-white">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={phases[phase]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm font-semibold text-primary"
          >
            {phases[phase]}
          </motion.p>
        </AnimatePresence>
        <motion.p
          initial={{ opacity: 0, scale: 0.94 }}
          animate={active ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
          className="mt-3 font-display text-xl font-semibold tracking-tight"
        >
          +1 (555) 128-2040
        </motion.p>
        <p className="mt-1 text-xs text-white/50">Outbound · United States</p>
      </div>

      <div className="grid w-full max-w-[180px] grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k, i) => (
          <motion.span
            key={k}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={active ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.25 }}
            className="flex aspect-square items-center justify-center rounded-full bg-white/10 text-sm font-medium"
          >
            {k}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.85, duration: 0.35, ease: EASE }}
        className="flex size-14 items-center justify-center rounded-full bg-primary"
      >
        <PhoneCall className="size-6 text-white" />
      </motion.div>
    </div>
  );
}

function ScreenContent({
  screen,
  active,
}: {
  screen: Slide["screen"];
  active: boolean;
}) {
  if (screen === "phone") return <PhoneLiveUI active={active} />;
  if (screen === "sheet") return <SheetLiveUI active={active} />;
  if (screen === "callcenter") return <CallLiveUI active={active} />;
  return <DialerLiveUI active={active} />;
}

/**
 * Continuous autoplay hero loop — same idea as Pass-On’s Vimeo:
 * directional slide transitions + live content loading inside the device.
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const Icon = slide.icon;
  const offset = enterOffset[slide.from];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative w-full overflow-hidden border-t border-border bg-white">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-20">
        {/* Left: step + copy (slides with each beat) */}
        <div className="relative z-10 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-copy"}
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: slide.from === "right" ? 40 : -40 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slide.from === "right" ? -28 : 28 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-display text-6xl font-semibold leading-none text-primary sm:text-7xl lg:text-8xl">
                {slide.step}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
                {slide.title}
              </h2>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {slide.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.title}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-ring ${
                  i === index ? "w-8 bg-dark" : "w-2.5 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: device stage — continuous directional load like the Vimeo */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[10/11] w-full max-w-[380px] sm:max-w-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-device"}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: offset.x, y: offset.y, scale: 0.96 }
                }
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: -offset.x * 0.35,
                  y: -offset.y * 0.35,
                  scale: 0.98,
                  transition: { duration: 0.35 },
                }}
                transition={{ duration: 0.65, ease: EASE }}
                className="absolute inset-0"
              >
                {/* Device frame */}
                <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_28px_80px_rgba(17,24,39,0.14)]">
                  {/* Top chrome */}
                  <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="size-2 rounded-full bg-[#F87171]" />
                    <span className="size-2 rounded-full bg-accent" />
                    <span className="size-2 rounded-full bg-primary" />
                    <span className="ml-2 text-[10px] font-semibold tracking-wide text-muted uppercase">
                      AnnyFlow · live
                    </span>
                  </div>

                  {/* Product photo strip */}
                  <div className="relative h-[38%] border-b border-border bg-[#F8FAFC]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="420px"
                      className="object-contain p-4"
                      priority
                    />
                  </div>

                  {/* Live loading UI inside “phone” */}
                  <div className="min-h-0 flex-1 p-3 sm:p-4">
                    <ScreenContent screen={slide.screen} active />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tiny progress bar under stage (video-like continuous feel) */}
          {!reduce ? (
            <div className="mx-auto mt-6 h-1 max-w-[380px] overflow-hidden rounded-full bg-border sm:max-w-[420px]">
              <motion.div
                key={slide.id + "-progress"}
                className="h-full origin-left rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
