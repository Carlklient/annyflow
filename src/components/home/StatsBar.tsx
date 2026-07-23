"use client";

import { motion } from "framer-motion";
import { SITE_STATS } from "@/data/content";

export function StatsBar() {
  return (
    <section className="relative border-y border-border/70 bg-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:gap-8 sm:px-8 sm:py-12 lg:grid-cols-4 lg:px-10">
        {SITE_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="text-center lg:text-left"
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm text-white/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
