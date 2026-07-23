"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  className?: string;
  scrolled?: boolean;
  animated?: boolean;
  priority?: boolean;
};

const LOGO_ASPECT = 1370 / 1655;

const HEIGHTS = {
  sm: 40,
  md: 52,
  lg: 64,
  xl: 96,
} as const;

/** Multi-layer glowing orb atmosphere around the DNA disc */
function GlowingOrb({
  hovering,
  gradId,
  className,
}: {
  hovering: boolean;
  gradId: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-[1%] left-1/2 z-0 aspect-square w-[78%] -translate-x-1/2",
        className
      )}
    >
      {/* Outer atmospheric bloom */}
      <motion.span
        className="absolute inset-[-35%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0.12) 40%, transparent 70%)",
          willChange: "transform, opacity",
        }}
        animate={{
          opacity: hovering ? 1 : [0.55, 0.85, 0.55],
          scale: hovering ? 1.18 : [1, 1.08, 1],
        }}
        transition={
          hovering
            ? { duration: 0.35 }
            : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Soft amber edge glow */}
      <motion.span
        className="absolute inset-[-18%] rounded-full blur-md"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(245,158,11,0.28), transparent 55%)",
          willChange: "opacity",
        }}
        animate={{ opacity: hovering ? 0.9 : [0.35, 0.6, 0.35] }}
        transition={
          hovering
            ? { duration: 0.35 }
            : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Core orb body / glass sphere */}
      <motion.span
        className="absolute inset-[6%] overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35) 0%, rgba(16,185,129,0.2) 28%, rgba(17,24,39,0.15) 62%, rgba(16,185,129,0.35) 100%)",
          boxShadow:
            "inset 0 0 18px rgba(16,185,129,0.35), inset -8px -10px 24px rgba(17,24,39,0.25), 0 0 24px rgba(16,185,129,0.35)",
          willChange: "transform, opacity",
        }}
        animate={{
          boxShadow: hovering
            ? "inset 0 0 22px rgba(16,185,129,0.5), inset -8px -10px 24px rgba(17,24,39,0.2), 0 0 36px rgba(16,185,129,0.55)"
            : [
                "inset 0 0 16px rgba(16,185,129,0.3), 0 0 18px rgba(16,185,129,0.28)",
                "inset 0 0 22px rgba(16,185,129,0.45), 0 0 30px rgba(16,185,129,0.42)",
                "inset 0 0 16px rgba(16,185,129,0.3), 0 0 18px rgba(16,185,129,0.28)",
              ],
        }}
        transition={
          hovering
            ? { duration: 0.35 }
            : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Specular highlight ,  orb shine */}
        <span
          className="absolute top-[10%] left-[16%] h-[34%] w-[38%] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 45%, transparent 70%)",
          }}
        />
      </motion.span>

      {/* Orbiting energy ring */}
      <motion.span
        className="absolute inset-[-4%]"
        animate={{ rotate: 360 }}
        transition={{
          duration: hovering ? 5.5 : 12,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="40%" stopColor="#10B981" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.6"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="43"
            fill="none"
            stroke="#10B981"
            strokeOpacity="0.25"
            strokeWidth="0.9"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
        </svg>
      </motion.span>
    </span>
  );
}

export function Logo({
  variant = "light",
  size = "md",
  href = "/",
  className,
  scrolled = false,
  animated = true,
  priority = false,
}: LogoProps) {
  const baseH = HEIGHTS[size];
  const h = scrolled ? Math.round(baseH * 0.86) : baseH;
  const w = Math.round(h * LOGO_ASPECT);
  const src =
    variant === "dark" ? "/brand/logo-footer.png" : "/brand/logo-header.png";
  const gradId = `orb-${useId().replace(/:/g, "")}`;

  const [hovering, setHovering] = useState(false);
  const [entranceKey, setEntranceKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const live = animated && !reduceMotion;

  useEffect(() => {
    if (!live) return;
    let wasAway = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 120) wasAway = true;
      if (wasAway && y < 8) {
        wasAway = false;
        setEntranceKey((k) => k + 1);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [live]);

  const inner = (
    <motion.span
      key={entranceKey}
      className={cn(
        "logo-root relative inline-flex items-center justify-center transition-transform duration-300",
        live && "hover:scale-105",
        className
      )}
      style={{ width: w, height: h, willChange: live ? "transform, opacity" : "auto" }}
      initial={live ? { opacity: 0, y: 10, scale: 0.94 } : false}
      animate={live ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => live && setHovering(true)}
      onHoverEnd={() => setHovering(false)}
    >
      <motion.span
        className="relative block transition-[width,height] duration-300 ease-out"
        style={{ width: w, height: h }}
        animate={live ? { y: [0, -3, 0] } : undefined}
        transition={
          live ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        {live && <GlowingOrb hovering={hovering} gradId={gradId} />}

        <span className="relative z-[2] block h-full w-full drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]">
          <Image
            src={src}
            alt="AnnyFlow"
            width={Math.max(w * 2, 1)}
            height={Math.max(h * 2, 1)}
            priority={priority}
            sizes={`${Math.ceil(w * 2)}px`}
            className="h-full w-full object-contain object-center select-none"
          />
        </span>

        {live && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3] overflow-hidden rounded-2xl"
          >
            <motion.span
              className="absolute inset-y-[-12%] w-[26%] bg-gradient-to-r from-transparent via-white/45 to-transparent skew-x-12"
              animate={{
                left: ["-40%", "120%"],
                opacity: [0, 0.75, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 4.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}
            />
          </motion.span>
        )}
      </motion.span>
    </motion.span>
  );

  if (href === null) return inner;

  return (
    <Link href={href} className="inline-flex rounded-xl focus-ring" aria-label="AnnyFlow home">
      {inner}
    </Link>
  );
}

export function LogoMark({
  className,
  size = 40,
  animated = true,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const gradId = `mark-orb-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const live = animated && !reduceMotion;

  return (
    <motion.span
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size, willChange: live ? "transform" : "auto" }}
      animate={live ? { y: [0, -2.5, 0] } : undefined}
      transition={live ? { duration: 5.2, repeat: Infinity, ease: "easeInOut" } : undefined}
      onHoverStart={() => live && setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      whileHover={live ? { scale: 1.08 } : undefined}
    >
      {/* Orb bloom */}
      <motion.span
        aria-hidden
        className="absolute inset-[-45%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0.15) 42%, transparent 70%)",
        }}
        animate={{
          opacity: hovering ? 1 : [0.55, 0.9, 0.55],
          scale: hovering ? 1.15 : [1, 1.1, 1],
        }}
        transition={
          hovering
            ? { duration: 0.3 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Glass orb shell */}
      <span
        aria-hidden
        className="absolute inset-[-6%] overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.4) 0%, rgba(16,185,129,0.18) 35%, rgba(17,24,39,0.12) 70%, rgba(16,185,129,0.3) 100%)",
          boxShadow:
            "inset 0 0 14px rgba(16,185,129,0.4), 0 0 20px rgba(16,185,129,0.4)",
        }}
      >
        <span
          className="absolute top-[12%] left-[18%] h-[32%] w-[36%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          }}
        />
      </span>

      {live && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-[-16%]"
          animate={{ rotate: 360 }}
          transition={{
            duration: hovering ? 5.5 : 12,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="1.5"
              strokeDasharray="4 7"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      )}

      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={size * 2}
        height={size * 2}
        className="relative z-[1] h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.45)]"
      />
    </motion.span>
  );
}
