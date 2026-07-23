"use client";

import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none lg:aspect-[5/4]">
      {/* Prism ambient glow */}
      <div
        className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-primary/25 via-sky-400/15 to-accent/20 blur-2xl"
        aria-hidden
      />

      <motion.div
        className="prism-border prism-sheen relative h-full overflow-hidden rounded-[1.5rem] shadow-lift sm:rounded-[1.75rem]"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-white/50 bg-white/40 px-4 py-3 backdrop-blur-md">
          <span className="size-2.5 rounded-full bg-[#F87171]" />
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="size-2.5 rounded-full bg-primary" />
          <span className="ml-3 rounded-full border border-white/50 bg-white/50 px-3 py-1 text-[10px] font-medium tracking-wide text-muted uppercase backdrop-blur-sm">
            AnnyFlow Control Plane
          </span>
        </div>

        <div className="grid h-[calc(100%-2.75rem)] grid-cols-12 gap-3 p-3 sm:gap-4 sm:p-4">
          {/* Sidebar */}
          <div className="col-span-3 hidden flex-col gap-2 rounded-2xl glass-dark p-3 text-white sm:flex">
            {["Automations", "Phone", "Outbound", "Reports"].map((item, i) => (
              <div
                key={item}
                className={`rounded-xl px-2.5 py-2 text-[10px] font-medium ${
                  i === 0 ? "bg-primary text-white shadow-glow" : "text-white/55"
                }`}
              >
                {item}
              </div>
            ))}
            <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "35%" }}
                  animate={{ width: ["35%", "78%", "55%", "88%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="mt-2 text-[9px] text-white/45">System health</p>
            </div>
          </div>

          {/* Main panel */}
          <div className="col-span-12 flex flex-col gap-3 sm:col-span-9">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Workflows", value: "128", tone: "text-primary" },
                { label: "Active Lines", value: "42", tone: "text-accent" },
                { label: "Dial Rate", value: "97%", tone: "text-dark" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/60 bg-white/45 p-2.5 shadow-soft backdrop-blur-md sm:p-3"
                >
                  <p className="text-[9px] font-medium tracking-wide text-muted uppercase">
                    {stat.label}
                  </p>
                  <p className={`mt-1 font-display text-lg font-semibold sm:text-xl ${stat.tone}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Workflow nodes */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/50 via-white/30 to-primary/10 p-3 backdrop-blur-sm sm:p-4">
              <p className="mb-3 text-[10px] font-semibold tracking-wide text-muted uppercase">
                Live workflow
              </p>
              <div className="relative flex items-center justify-between gap-2">
                {[
                  { t: "Lead", c: "bg-dark" },
                  { t: "CRM", c: "bg-primary" },
                  { t: "PBX", c: "bg-accent" },
                  { t: "Dialer", c: "bg-dark" },
                ].map((node, i) => (
                  <div key={node.t} className="relative z-10 flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      className={`flex size-10 items-center justify-center rounded-2xl text-[10px] font-semibold text-white shadow-soft sm:size-12 sm:text-xs ${node.c}`}
                      animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                      transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {node.t}
                    </motion.div>
                  </div>
                ))}
                <svg
                  className="pointer-events-none absolute top-5 left-4 right-4 h-2 sm:top-6"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M0 4 H100"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/60 bg-white/55 p-2.5 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-medium text-muted">Call Queue</span>
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold text-primary">
                      Live
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {[70, 45, 88].map((w, i) => (
                      <div key={i} className="h-1.5 overflow-hidden rounded-full bg-dark/5">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/60 bg-white/55 p-2.5 backdrop-blur-sm">
                  <span className="text-[9px] font-medium text-muted">AI Receptionist</span>
                  <div className="mt-2 flex h-10 items-end gap-1">
                    {[4, 7, 5, 9, 6, 8, 4, 7, 10, 5].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/80"
                        animate={{
                          height: [`${h * 6}%`, `${((h + 3) % 10) * 8 + 20}%`, `${h * 6}%`],
                        }}
                        transition={{ duration: 1.6 + i * 0.08, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        className="absolute top-2 right-2 rounded-2xl prism-border prism-border-soft px-2.5 py-1.5 text-[11px] font-medium shadow-lift sm:top-4 sm:right-0 sm:px-3 sm:py-2 sm:text-xs"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mr-2 inline-block size-1.5 rounded-full bg-primary" />
        CRM sync active
      </motion.div>
      <motion.div
        className="absolute bottom-4 left-2 rounded-2xl prism-border prism-border-soft px-2.5 py-1.5 text-[11px] font-medium shadow-lift sm:bottom-10 sm:left-0 sm:px-3 sm:py-2 sm:text-xs"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="mr-2 inline-block size-1.5 rounded-full bg-accent" />
        Predictive dialer
      </motion.div>
    </div>
  );
}
