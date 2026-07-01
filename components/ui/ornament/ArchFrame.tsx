"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  /** "pointed" = Mughal mehrab arch, "dome" = softer horseshoe arch */
  shape?: "pointed" | "dome";
}

const ARCH_PATHS = {
  pointed:
    "M0,1 L0,0.42 C0,0.16 0.2,0.02 0.5,0 C0.8,0.02 1,0.16 1,0.42 L1,1 Z",
  dome: "M0,1 L0,0.5 C0,0.18 0.22,0 0.5,0 C0.78,0 1,0.18 1,0.5 L1,1 Z",
};

/**
 * Clips its children into a temple/Mughal arch silhouette.
 * Uses an objectBoundingBox SVG clipPath so it scales with the container.
 */
export default function ArchFrame({
  children,
  className,
  shape = "pointed",
}: ArchFrameProps) {
  const rawId = useId().replace(/[:]/g, "");
  const clipId = `arch-${rawId}`;

  return (
    <div
      className={cn("relative", className)}
      style={{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }}
    >
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={ARCH_PATHS[shape]} />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
}
