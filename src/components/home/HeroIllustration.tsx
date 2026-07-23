"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const HUBS = [
  { id: "crm", label: "CRM", x: 160, y: 260, tone: "#10B981" },
  { id: "sheets", label: "Sheets", x: 340, y: 150, tone: "#059669" },
  { id: "phone", label: "Phone", x: 560, y: 200, tone: "#111827" },
  { id: "dialer", label: "Dialer", x: 780, y: 280, tone: "#F59E0B" },
  { id: "ai", label: "AI", x: 440, y: 360, tone: "#10B981" },
  { id: "ops", label: "Ops", x: 680, y: 420, tone: "#111827" },
  { id: "pbx", label: "PBX", x: 240, y: 400, tone: "#F59E0B" },
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
  ["crm", "pbx"],
  ["pbx", "ai"],
  ["pbx", "ops"],
];

function hub(id: string) {
  return HUBS.find((h) => h.id === id)!;
}

/**
 * Full-bleed operations map — fills the hero image slot
 * (Pass-On style: animated map as the main hero visual).
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative w-full overflow-hidden bg-[#F8FAFC]"
      role="img"
      aria-label="Animated operations map connecting CRM, spreadsheets, phone systems, and outbound dialing"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(ellipse_at_75%_70%,rgba(245,158,11,0.08),transparent_50%)]"
        aria-hidden
      />

      <svg
        viewBox="0 0 960 520"
        className="relative block h-[min(52vw,420px)] w-full sm:h-[min(48vw,480px)] lg:h-[520px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          </pattern>
          <linearGradient id="hero-route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="45%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="960" height="520" fill="url(#hero-map-grid)" opacity="0.85" />

        {/* Territory — abstract landmass */}
        <motion.path
          d="M80 180 C 220 70, 400 60, 520 120 C 640 70, 780 100, 880 180 C 940 250, 900 360, 780 410 C 620 480, 400 460, 260 400 C 140 350, 50 280, 80 180 Z"
          fill="#ECFDF5"
          stroke="#6EE7B7"
          strokeWidth="2.5"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformOrigin: "480px 260px" }}
        />
        <path
          d="M200 220 C 300 170, 400 190, 450 250 C 390 310, 270 320, 200 270 Z"
          fill="#A7F3D0"
          opacity="0.45"
        />
        <path
          d="M560 210 C 660 170, 760 210, 790 280 C 730 340, 600 330, 560 260 Z"
          fill="#FDE68A"
          opacity="0.35"
        />

        {/* City dots scatter */}
        {[
          [140, 300],
          [300, 280],
          [480, 160],
          [620, 300],
          [740, 180],
          [820, 360],
          [360, 420],
          [500, 400],
        ].map(([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 2 ? 3 : 2} fill="#10B981" opacity="0.35" />
        ))}

        {ROUTES.map(([from, to], i) => {
          const a = hub(from);
          const b = hub(to);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 28 - (i % 3) * 10;
          const d = `M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
          return (
            <g key={`${from}-${to}`}>
              <path d={d} fill="none" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="5 7" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#hero-route)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={
                  reduce
                    ? { pathLength: 1, opacity: 0.75 }
                    : { pathLength: [0, 1], opacity: [0.25, 1, 0.35] }
                }
                transition={{
                  duration: 2.6 + (i % 4) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </g>
          );
        })}

        {HUBS.map((h, i) => (
          <g key={h.id}>
            {!reduce && (
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="28"
                fill={h.tone}
                opacity="0.12"
                animate={{ scale: [1, 1.35, 1], opacity: [0.12, 0.22, 0.12] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              />
            )}
            <motion.circle
              cx={h.x}
              cy={h.y}
              r="20"
              fill="white"
              stroke={h.tone}
              strokeWidth="3"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: EASE }}
              style={{ transformOrigin: `${h.x}px ${h.y}px` }}
            />
            <circle cx={h.x} cy={h.y} r="7" fill={h.tone} />
            <text
              x={h.x}
              y={h.y + 38}
              textAnchor="middle"
              fill="#111827"
              style={{ fontSize: 14, fontWeight: 650, fontFamily: "system-ui, sans-serif" }}
            >
              {h.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
