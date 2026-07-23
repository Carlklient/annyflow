"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactPills } from "@/components/ui/ContactPills";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { LogoMark } from "@/components/brand/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE = [
  { text: "Automation,", accent: true },
  { text: "spreadsheets,", accent: false },
  { text: "and calling", accent: false },
  { text: "infrastructure—", accent: true },
  { text: "engineered for scale.", accent: false },
] as const;

function MotionField({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 prism-mesh" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(248,250,252,0.85)_100%)]" />

      {!reduce && (
        <>
          <div className="absolute -top-28 -left-20 size-[min(480px,95vw)] animate-blob rounded-full bg-primary/25 blur-3xl" />
          <div
            className="absolute top-[20%] -right-24 size-[min(420px,90vw)] animate-blob rounded-full bg-sky-400/20 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-16 left-[30%] size-[min(360px,75vw)] animate-blob rounded-full bg-accent/20 blur-3xl"
            style={{ animationDelay: "4s" }}
          />
        </>
      )}

      {/* Flowing automation network */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hero-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="40%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M80 180 C 260 120, 420 260, 620 200 S 980 140, 1140 220",
          "M60 420 C 280 360, 480 520, 700 440 S 1000 380, 1160 480",
          "M100 640 C 320 580, 520 720, 760 640 S 1020 580, 1180 680",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#hero-flow)"
            strokeWidth="1.5"
            strokeDasharray="8 14"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={
              reduce
                ? { opacity: 0.5 }
                : {
                    pathLength: [0.15, 1, 0.35],
                    opacity: [0.25, 0.7, 0.3],
                  }
            }
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
        {[
          [180, 160],
          [420, 240],
          [640, 190],
          [880, 250],
          [260, 430],
          [540, 470],
          [820, 420],
          [340, 650],
          [680, 630],
          [980, 670],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill={i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#38BDF8" : "#F59E0B"}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={
              reduce
                ? { opacity: 0.55 }
                : {
                    scale: [0.7, 1.25, 0.85],
                    opacity: [0.35, 0.9, 0.45],
                  }
            }
            transition={{
              duration: 3.2 + (i % 4) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4 + i * 0.12,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const tilt = useMotionTemplate`perspective(1100px) rotateX(${springY}deg) rotateY(${springX}deg)`;

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 8);
    my.set(py * -6);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col overflow-x-clip pt-20"
    >
      <MotionField reduce={reduce} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-10 lg:py-16">
        <div className="relative max-w-xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-3 rounded-full prism-border prism-border-soft px-3.5 py-2"
          >
            <LogoMark size={28} />
            <span className="font-display text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              AnnyFlow
            </span>
            <motion.span
              className="ml-1 hidden size-1.5 rounded-full bg-primary sm:inline-block"
              animate={reduce ? undefined : { opacity: [1, 0.25, 1], scale: [1, 0.75, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <h1 className="mt-6 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-dark sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
            {HEADLINE.map((part, i) => (
              <motion.span
                key={part.text}
                className={`mr-[0.28em] inline-block ${part.accent ? "text-primary" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 + i * 0.09, ease: EASE }}
              >
                {part.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: EASE }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            We design business automation, spreadsheet systems, phone platforms, and
            outbound dialing stacks that operate like modern software products.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.div
              animate={
                reduce || !ready
                  ? undefined
                  : { scale: [1, 1.03, 1], boxShadow: ["0 0 0 0 rgba(16,185,129,0)", "0 0 0 10px rgba(16,185,129,0.12)", "0 0 0 0 rgba(16,185,129,0)"] }
              }
              transition={{ duration: 2.4, delay: 1.4, times: [0, 0.45, 1], repeat: 1 }}
              className="w-full rounded-full sm:w-auto"
            >
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Book free consultation
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
            <Button href="/portfolio" variant="secondary" size="lg" className="w-full sm:w-auto">
              See real projects
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.05, ease: EASE }}
            className="mt-8 hidden sm:block"
          >
            <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">
              Reach us instantly
            </p>
            <ContactPills />
          </motion.div>
        </div>

        <motion.div
          style={reduce ? undefined : { transform: tilt }}
          className="relative mx-auto w-full max-w-lg will-change-transform lg:mx-0 lg:max-w-none lg:pl-2"
          initial={reduce ? false : { opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-10 mb-6 flex flex-col items-center gap-1 self-center text-xs font-medium tracking-wide text-muted uppercase focus-ring"
        aria-label="Scroll to next section"
      >
        <span>Explore</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4 text-primary" />
        </motion.span>
      </motion.a>
    </section>
  );
}
