"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hub nodes on the operations map — related to AnnyFlow services */
const HUBS = [
  { id: "crm", label: "CRM", x: 180, y: 220, tone: "#10B981" },
  { id: "sheets", label: "Sheets", x: 320, y: 140, tone: "#059669" },
  { id: "phone", label: "Phone", x: 520, y: 180, tone: "#111827" },
  { id: "dialer", label: "Dialer", x: 700, y: 250, tone: "#F59E0B" },
  { id: "ai", label: "AI", x: 420, y: 320, tone: "#10B981" },
  { id: "ops", label: "Ops", x: 600, y: 380, tone: "#111827" },
] as const;

const ROUTES: [string, string][] = [
  ["crm", "sheets"],
  ["sheets", "phone"],
  ["phone", "dialer"],
  ["crm", "ai"],
  ["ai", "dialer"],
  ["phone", "ops"],
  ["ai", "ops"],
  ["sheets", "ai"],
];

function hub(id: string) {
  return HUBS.find((h) => h.id === id)!;
}

export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-lift sm:rounded-[2rem]">
      {/* Soft brand wash — emerald only */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(245,158,11,0.06),transparent_45%)]"
        aria-hidden
      />

      <div className="relative px-3 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="mb-3 flex items-center justify-between px-2 sm:mb-4">
          <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
            Live operations map
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
            <motion.span
              className="size-1.5 rounded-full bg-primary"
              animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Syncing systems
          </span>
        </div>

        <svg
          viewBox="0 0 880 480"
          className="h-auto w-full"
          role="img"
          aria-label="Animated map of connected business automation, phone, and outbound systems"
        >
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="route-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
            <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Map base */}
          <rect width="880" height="480" fill="url(#map-grid)" opacity="0.7" />

          {/* Soft continent / territory shapes — abstract, not a real map copy */}
          <motion.path
            d="M120 160 C 200 90, 340 80, 420 130 C 500 90, 620 110, 720 160 C 780 210, 760 320, 680 360 C 560 420, 380 400, 260 360 C 160 320, 90 240, 120 160 Z"
            fill="#ECFDF5"
            stroke="#A7F3D0"
            strokeWidth="2"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ transformOrigin: "440px 240px" }}
          />
          <path
            d="M200 200 C 280 170, 360 190, 400 230 C 360 280, 260 290, 210 250 Z"
            fill="#D1FAE5"
            opacity="0.55"
          />
          <path
            d="M520 200 C 600 170, 680 200, 700 250 C 660 300, 560 290, 520 240 Z"
            fill="#FEF3C7"
            opacity="0.45"
          />

          {/* Animated routes between hubs */}
          {ROUTES.map(([from, to], i) => {
            const a = hub(from);
            const b = hub(to);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 24 - (i % 3) * 8;
            const d = `M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
            return (
              <g key={`${from}-${to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="url(#route-green)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    reduce
                      ? { pathLength: 1, opacity: 0.7 }
                      : { pathLength: [0, 1], opacity: [0.2, 1, 0.3] }
                  }
                  transition={{
                    duration: 2.8 + (i % 4) * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  }}
                />
              </g>
            );
          })}

          {/* Hub nodes */}
          {HUBS.map((h, i) => (
            <g key={h.id}>
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="22"
                fill="white"
                stroke={h.tone}
                strokeWidth="2.5"
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.45, ease: EASE }}
                style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              />
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="8"
                fill={h.tone}
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }
                }
                transition={{
                  duration: 2.4 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              />
              <motion.text
                x={h.x}
                y={h.y + 40}
                textAnchor="middle"
                className="fill-dark"
                style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)" }}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                {h.label}
              </motion.text>
            </g>
          ))}

          {/* Floating call / data packets */}
          {!reduce &&
            [
              { x: 250, y: 280, delay: 0 },
              { x: 480, y: 120, delay: 0.8 },
              { x: 640, y: 320, delay: 1.4 },
            ].map((p) => (
              <motion.g
                key={`${p.x}-${p.y}`}
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width="36"
                  height="18"
                  rx="9"
                  fill="#111827"
                />
                <circle cx={p.x + 10} cy={p.y + 9} r="3" fill="#10B981" />
              </motion.g>
            ))}
        </svg>

        {/* Caption row */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-2 text-[11px] text-muted sm:mt-3 sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" /> Workflow sync
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-dark" /> Phone systems
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent" /> Outbound routes
          </span>
        </div>
      </div>
    </div>
  );
}
