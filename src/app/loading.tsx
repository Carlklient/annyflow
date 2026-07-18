"use client";

import { LogoMark } from "@/components/brand/Logo";

export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 pt-20"
      aria-busy="true"
      aria-label="Loading"
    >
      <LogoMark size={48} />
      <div className="h-0.5 w-20 overflow-hidden rounded-full bg-border">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
      </div>
    </div>
  );
}
