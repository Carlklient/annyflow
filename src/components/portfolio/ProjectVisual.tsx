"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import type { PortfolioItem, PortfolioVisual } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = { project: PortfolioItem };

function GradientBg({
  id,
  from,
  to,
  mid,
}: {
  id: string;
  from: string;
  to: string;
  mid?: string;
}) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={from} />
        {mid && <stop offset="50%" stopColor={mid} />}
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
  );
}

function ImageLightbox({
  open,
  onClose,
  src,
  title,
  accent,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  accent: string;
}) {
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setZoom(1);
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
      if (e.key === "-") setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="portfolio-lightbox"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute inset-0 bg-dark/88 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal
            aria-label={`${title} full preview`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div>
                <p className="font-display text-sm font-semibold text-white sm:text-base">
                  {title}
                </p>
                <p className="text-xs text-white/50">Use + / − to zoom · Esc to close</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="size-4" />
                </button>
                <span className="min-w-12 text-center text-xs font-medium text-white/70">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-1 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto p-3 sm:p-5">
              <div
                className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white"
                style={{
                  aspectRatio: "16 / 10",
                  boxShadow: `0 0 0 1px ${accent}55, 0 24px 60px rgba(0,0,0,0.45)`,
                }}
              >
                <div
                  className="absolute inset-0 origin-center will-change-transform"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-contain p-2"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function ScreenshotVisual({ project }: { project: PortfolioItem }) {
  const src = project.image!;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const isDiagram =
    project.pillar === "phone" ||
    project.pillar === "outbound" ||
    /workflow|diagram|architecture|dialer/i.test(
      project.title + project.categoryLabel
    );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/shot relative block h-full w-full cursor-zoom-in overflow-hidden text-left focus-ring"
        aria-label={`Expand ${project.title} preview`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, #0f172a 0%, ${project.accent}22 45%, #020617 100%)`,
          }}
        />

        <div
          className="absolute inset-[10px] overflow-hidden rounded-xl border-2 border-white/90 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover/shot:scale-[1.03] sm:inset-3"
          style={{
            boxShadow: `0 0 0 1px ${project.accent}66, 0 16px 40px rgba(0,0,0,0.35)`,
          }}
        >
          <Image
            src={src}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            quality={90}
            className={cn(
              "contrast-[1.05] saturate-[1.06]",
              isDiagram ? "object-contain bg-white p-1.5" : "object-cover object-top"
            )}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 opacity-90"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        <span className="absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-dark/90 px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-white uppercase shadow-lift">
          <Expand className="size-3" />
          Zoom
        </span>
      </button>

      <ImageLightbox
        open={open}
        onClose={close}
        src={src}
        title={project.title}
        accent={project.accent}
      />
    </>
  );
}

function Illustration({ visual, project }: { visual: PortfolioVisual; project: PortfolioItem }) {
  const gid = `viz-${project.id}`;
  const accent = project.accent;

  switch (visual) {
    case "workflow":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from={accent} to="#111827" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={36 + i * 88}
                y={90}
                width={64}
                height={64}
                rx="16"
                fill="white"
                opacity={0.14 + i * 0.04}
              />
              <circle cx={68 + i * 88} cy={122} r="10" fill={i % 2 ? "#F59E0B" : "#10B981"} />
            </g>
          ))}
          <path
            d="M100 122 H124 M188 122 H212 M276 122 H300"
            stroke="white"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        </svg>
      );
    case "sales":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#064E3B" to={accent} mid="#111827" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          {[40, 90, 140, 190].map((y, i) => (
            <rect
              key={y}
              x="48"
              y={y}
              width={180 + i * 28}
              height="28"
              rx="10"
              fill="white"
              opacity={0.12 + i * 0.05}
            />
          ))}
          <circle cx="320" cy="125" r="48" fill="#10B981" opacity="0.85" />
          <path d="M300 125 L314 139 L344 109" stroke="white" strokeWidth="4" fill="none" />
        </svg>
      );
    case "real-estate":
    case "legal":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from={accent} to="#111827" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          <rect x="48" y="48" width="140" height="154" rx="16" fill="white" opacity="0.12" />
          <rect x="212" y="48" width="140" height="70" rx="14" fill="white" opacity="0.16" />
          <rect x="212" y="132" width="140" height="70" rx="14" fill="#10B981" opacity="0.55" />
        </svg>
      );
    case "construction":
    case "property":
    case "project":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#111827" to={accent} />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={48 + i * 110}
              y={70 + i * 12}
              width="90"
              height={110 - i * 12}
              rx="12"
              fill="white"
              opacity={0.12 + i * 0.06}
            />
          ))}
        </svg>
      );
    case "healthcare":
    case "booking":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from={accent} to="#064E3B" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          <circle cx="200" cy="120" r="54" fill="white" opacity="0.12" />
          <path
            d="M200 92 V148 M168 120 H232"
            stroke="#10B981"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      );
    case "lms":
    case "time":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#111827" to={accent} mid="#064E3B" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={70 + col * 90}
                y={48 + row * 42}
                width="70"
                height="28"
                rx="8"
                fill="white"
                opacity={0.1 + ((row + col) % 3) * 0.06}
              />
            ))
          )}
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#111827" to="#064E3B" mid={accent} />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          <circle cx="200" cy="120" r="50" fill="white" opacity="0.12" />
          <circle cx="200" cy="120" r="28" fill="#10B981" opacity="0.9" />
          {[
            [278, 120],
            [239, 167],
            [161, 167],
            [122, 120],
            [161, 73],
            [239, 73],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="8"
              fill={i % 2 ? "#F59E0B" : "white"}
              opacity="0.7"
            />
          ))}
        </svg>
      );
    case "phone":
    case "phone-3cx":
    case "phone-cloud":
    case "phone-sip":
    case "phone-ivr":
    case "phone-crm":
    case "phone-teams":
    case "phone-yeastar":
    case "phone-voip":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#111827" to={accent} />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          <rect x="40" y="40" width="160" height="170" rx="20" fill="white" opacity="0.12" />
          <circle cx="300" cy="125" r="34" fill="#10B981" opacity="0.85" />
        </svg>
      );
    case "outbound":
    case "outbound-vicidial":
    case "outbound-predictive":
    case "outbound-ai":
    case "outbound-broadcast":
    case "outbound-analytics":
    case "outbound-leads":
    case "outbound-workforce":
      return (
        <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
          <GradientBg id={gid} from="#111827" to={accent} mid="#064E3B" />
          <rect width="400" height="250" fill={`url(#${gid})`} />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={68 + i * 115}
              y="70"
              width="60"
              height="90"
              rx="12"
              fill="white"
              opacity="0.12"
            />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

export function ProjectVisual({ project }: Props) {
  return (
    <div className="h-full w-full" role="img" aria-label={`${project.title} preview`}>
      {project.image ? (
        <ScreenshotVisual project={project} />
      ) : (
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <Illustration visual={project.visual} project={project} />
        </div>
      )}
    </div>
  );
}
