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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="font-display text-4xl font-semibold tracking-tight text-dark sm:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <section id="stats" className="border-y border-border/70 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-3 sm:gap-8 sm:px-8 sm:py-20 lg:px-10">
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
