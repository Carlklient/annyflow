"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Concrete hero scene: phones, spreadsheet, call center, CRM —
 * connected so visitors instantly see what AnnyFlow does.
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative w-full overflow-hidden border-t border-border bg-[#F8FAFC]"
      role="img"
      aria-label="Phones, spreadsheets, call center, and CRM systems connected by AnnyFlow automation"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.1),transparent_55%)]"
        aria-hidden
      />

      <svg
        viewBox="0 0 1100 520"
        className="relative mx-auto block h-auto w-full max-w-6xl px-2 sm:px-4"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wire" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#111827" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Soft floor shadow */}
        <ellipse cx="550" cy="480" rx="420" ry="18" fill="#111827" opacity="0.06" />

        {/* ===== Connection wires (behind objects) ===== */}
        {[
          "M210 280 C 320 200, 380 200, 430 260",
          "M480 300 C 540 220, 600 220, 650 280",
          "M720 300 C 800 240, 860 240, 920 280",
          "M280 360 C 400 400, 520 400, 640 360",
          "M350 320 C 480 380, 620 380, 750 330",
        ].map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 8" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#wire)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={
                reduce
                  ? { pathLength: 1, opacity: 0.8 }
                  : { pathLength: [0, 1], opacity: [0.3, 1, 0.4] }
              }
              transition={{
                duration: 2.8 + i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          </g>
        ))}

        {/* ===== 1. Desk phone ===== */}
        <motion.g
          filter="url(#softShadow)"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        >
          <rect x="90" y="250" width="150" height="110" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="2" />
          <rect x="108" y="268" width="70" height="48" rx="8" fill="#111827" />
          <rect x="118" y="278" width="50" height="8" rx="2" fill="#10B981" opacity="0.9" />
          <rect x="118" y="292" width="36" height="6" rx="2" fill="#6B7280" />
          {/* Keypad */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={192 + col * 16}
                cy={278 + row * 16}
                r="5"
                fill="#E5E7EB"
              />
            ))
          )}
          {/* Handset */}
          <motion.path
            d="M120 240 C 120 220, 210 220, 210 240 L 200 248 C 200 238, 130 238, 130 248 Z"
            fill="#10B981"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="165" y="385" textAnchor="middle" fill="#6B7280" style={{ fontSize: 13, fontWeight: 600 }}>
            Business phone
          </text>
        </motion.g>

        {/* ===== 2. Spreadsheet ===== */}
        <motion.g
          filter="url(#softShadow)"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
        >
          <rect x="340" y="200" width="180" height="140" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="2" />
          {/* Sheet header */}
          <rect x="340" y="200" width="180" height="28" rx="16" fill="#059669" />
          <rect x="340" y="214" width="180" height="14" fill="#059669" />
          <text x="430" y="219" textAnchor="middle" fill="white" style={{ fontSize: 11, fontWeight: 700 }}>
            Spreadsheet
          </text>
          {/* Grid */}
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={352 + col * 40}
                y={238 + row * 18}
                width="36"
                height="14"
                rx="2"
                fill={row === 0 ? "#D1FAE5" : col === 0 ? "#ECFDF5" : "#F8FAFC"}
                stroke="#A7F3D0"
                strokeWidth="1"
              />
            ))
          )}
          <text x="430" y="370" textAnchor="middle" fill="#6B7280" style={{ fontSize: 13, fontWeight: 600 }}>
            Excel · Sheets
          </text>
        </motion.g>

        {/* ===== 3. Call center headset + screen ===== */}
        <motion.g
          filter="url(#softShadow)"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
        >
          <rect x="580" y="210" width="200" height="150" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="2" />
          {/* Monitor */}
          <rect x="600" y="228" width="160" height="95" rx="10" fill="#111827" />
          <rect x="612" y="240" width="136" height="72" rx="6" fill="#1F2937" />
          {/* Waveform / live calls */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.rect
              key={i}
              x={620 + i * 12}
              y={280}
              width="6"
              height="24"
              rx="2"
              fill="#10B981"
              animate={
                reduce
                  ? undefined
                  : {
                      height: [12 + (i % 4) * 6, 28 + (i % 5) * 4, 12 + (i % 4) * 6],
                      y: [292 - (12 + (i % 4) * 6) / 2, 292 - (28 + (i % 5) * 4) / 2, 292 - (12 + (i % 4) * 6) / 2],
                    }
              }
              transition={{ duration: 1.2 + i * 0.05, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <text x="680" y="258" textAnchor="middle" fill="#9CA3AF" style={{ fontSize: 9, fontWeight: 600 }}>
            LIVE CALLS
          </text>
          {/* Headset icon */}
          <motion.g
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M640 340 C 640 318, 720 318, 720 340"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <rect x="632" y="336" width="16" height="22" rx="5" fill="#F59E0B" />
            <rect x="712" y="336" width="16" height="22" rx="5" fill="#F59E0B" />
            <path d="M720 348 L 736 360" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
          <text x="680" y="395" textAnchor="middle" fill="#6B7280" style={{ fontSize: 13, fontWeight: 600 }}>
            Call center
          </text>
        </motion.g>

        {/* ===== 4. Smartphone / outbound ===== */}
        <motion.g
          filter="url(#softShadow)"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
        >
          <rect x="860" y="230" width="100" height="170" rx="18" fill="white" stroke="#E5E7EB" strokeWidth="2" />
          <rect x="870" y="248" width="80" height="120" rx="8" fill="#111827" />
          <circle cx="910" cy="382" r="8" fill="#E5E7EB" />
          {/* Dial pad glow */}
          <motion.circle
            cx="910"
            cy="300"
            r="22"
            fill="#10B981"
            opacity="0.25"
            animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "910px 300px" }}
          />
          <circle cx="910" cy="300" r="14" fill="#10B981" />
          <path
            d="M904 296 L908 304 L918 292"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="880" y="268" fill="#9CA3AF" style={{ fontSize: 8, fontWeight: 600 }}>
            OUTBOUND
          </text>
          <text x="910" y="430" textAnchor="middle" fill="#6B7280" style={{ fontSize: 13, fontWeight: 600 }}>
            Dialer
          </text>
        </motion.g>

        {/* ===== Center CRM hub badge ===== */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
        >
          <rect x="470" y="430" width="160" height="44" rx="22" fill="#111827" filter="url(#softShadow)" />
          <circle cx="498" cy="452" r="8" fill="#10B981" />
          <text x="558" y="457" textAnchor="middle" fill="white" style={{ fontSize: 13, fontWeight: 650 }}>
            CRM connected
          </text>
        </motion.g>

        {/* Floating status chips — clean, no overlap */}
        <motion.g
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="250" y="120" width="120" height="32" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
          <circle cx="270" cy="136" r="5" fill="#10B981" />
          <text x="320" y="141" textAnchor="middle" fill="#111827" style={{ fontSize: 12, fontWeight: 600 }}>
            Auto sync
          </text>
        </motion.g>
        <motion.g
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <rect x="720" y="130" width="140" height="32" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
          <circle cx="742" cy="146" r="5" fill="#F59E0B" />
          <text x="800" y="151" textAnchor="middle" fill="#111827" style={{ fontSize: 12, fontWeight: 600 }}>
            Calls routing
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
