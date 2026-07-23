"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const NODES = [
  { t: "Lead", c: "bg-dark" },
  { t: "CRM", c: "bg-primary" },
  { t: "PBX", c: "bg-accent" },
  { t: "Dialer", c: "bg-dark" },
] as const;

export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full pb-2">
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-lift sm:rounded-[2rem]"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        <div className="flex items-center gap-2 border-b border-border bg-background px-5 py-3.5">
          <span className="size-2.5 rounded-full bg-[#F87171]" />
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="size-2.5 rounded-full bg-primary" />
          <span className="ml-3 text-[11px] font-medium tracking-wide text-muted">
            AnnyFlow Control Plane
          </span>
          <span className="ml-auto hidden items-center gap-1.5 text-[10px] font-semibold text-primary sm:inline-flex">
            <span className="size-1.5 rounded-full bg-primary" />
            Live
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-12 sm:gap-5 sm:p-6 lg:p-8">
          <div className="hidden flex-col gap-2 rounded-2xl bg-dark p-4 text-white sm:col-span-3 sm:flex">
            {["Automations", "Phone", "Outbound", "Reports"].map((item, i) => (
              <div
                key={item}
                className={`rounded-xl px-3 py-2.5 text-xs font-medium ${
                  i === 0 ? "bg-primary text-white" : "text-white/50"
                }`}
              >
                {item}
              </div>
            ))}
            <div className="mt-auto rounded-xl bg-white/5 p-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={reduce ? { width: "78%" } : { width: ["40%", "82%", "60%", "90%"] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="mt-2 text-[10px] text-white/40">System health</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-9">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Workflows", value: "128", color: "text-primary" },
                { label: "Active Lines", value: "42", color: "text-accent" },
                { label: "Dial Rate", value: "97%", color: "text-dark" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-background p-3 sm:p-4"
                >
                  <p className="text-[10px] font-medium tracking-wide text-muted uppercase">
                    {stat.label}
                  </p>
                  <p className={`mt-1 font-display text-xl font-semibold sm:text-2xl ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-background p-4 sm:p-5">
              <p className="mb-4 text-[10px] font-semibold tracking-wide text-muted uppercase">
                Live workflow
              </p>
              <div className="relative flex items-center justify-between gap-2 px-1 sm:px-4">
                {NODES.map((node, i) => (
                  <div key={node.t} className="relative z-10 flex flex-1 flex-col items-center">
                    <motion.div
                      className={`flex size-12 items-center justify-center rounded-2xl text-xs font-semibold text-white shadow-soft sm:size-14 sm:text-sm ${node.c}`}
                      animate={
                        reduce ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }
                      }
                      transition={{
                        duration: 3.8 + i * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {node.t}
                    </motion.div>
                  </div>
                ))}
                <svg
                  className="pointer-events-none absolute top-6 left-6 right-6 h-2 sm:top-7"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M0 4 H100"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    fill="none"
                    animate={{ pathLength: [0.2, 1], opacity: [0.4, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted">Call Queue</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                      Live
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[72, 48, 90].map((w, i) => (
                      <div key={i} className="h-1.5 overflow-hidden rounded-full bg-dark/5">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: EASE }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-white p-3">
                  <span className="text-[10px] font-medium text-muted">AI Receptionist</span>
                  <div className="mt-3 flex h-11 items-end gap-1">
                    {[4, 7, 5, 9, 6, 8, 4, 7, 10, 5].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/85"
                        animate={
                          reduce
                            ? { height: `${h * 8}%` }
                            : {
                                height: [`${h * 6}%`, `${((h + 3) % 10) * 8 + 22}%`, `${h * 6}%`],
                              }
                        }
                        transition={{
                          duration: 1.6 + i * 0.06,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
