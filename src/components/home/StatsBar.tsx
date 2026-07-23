"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { SITE_STATS } from "@/data/content";

function AnimatedStat({
  value,
  suffix,
  label,
  decimals = 0,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 0.8,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="prism-border-dark prism-sheen group relative overflow-hidden rounded-2xl px-5 py-6 text-center sm:px-6 sm:py-7 lg:text-left"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(16,185,129,0.22), transparent 55%)",
        }}
      />
      <motion.p
        className="relative z-[1] font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-[2.75rem]"
        animate={
          inView
            ? {
                textShadow: [
                  "0 0 0px rgba(16,185,129,0)",
                  "0 0 18px rgba(16,185,129,0.35)",
                  "0 0 8px rgba(16,185,129,0.15)",
                ],
              }
            : undefined
        }
        transition={{ duration: 1.4, delay: 0.3 + index * 0.1 }}
      >
        {display}
        {suffix}
      </motion.p>
      <p className="relative z-[1] mt-2 text-sm text-white/60">{label}</p>
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 z-[1] h-0.5 w-full origin-left bg-gradient-to-r from-primary via-sky-400/70 to-accent/60"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <section id="stats" className="relative overflow-hidden border-y border-white/10 bg-dark text-white">
      <div className="pointer-events-none absolute inset-0 prism-mesh-dark" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 size-56 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 size-48 rounded-full bg-sky-400/10 blur-3xl"
        animate={{ opacity: [0.25, 0.55, 0.25], x: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-3 sm:gap-5 sm:px-8 sm:py-12 lg:gap-6 lg:px-10">
        {SITE_STATS.map((stat, i) => (
          <AnimatedStat
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            decimals={"decimals" in stat ? stat.decimals : 0}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
