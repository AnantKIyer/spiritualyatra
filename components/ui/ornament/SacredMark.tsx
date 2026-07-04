import { cn } from "@/lib/utils";

interface SacredMarkProps {
  className?: string;
}

/**
 * A small lotus/mandala flourish used to flank eyebrows and labels.
 */
export default function SacredMark({ className }: SacredMarkProps) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      aria-hidden
      className={cn("inline-block", className)}
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <line x1="0" y1="7" x2="6" y2="7" strokeOpacity="0.5" />
        <path d="M9 7 C9 3 11 1 11 1 C11 1 13 3 13 7 C13 11 11 13 11 13 C11 13 9 11 9 7 Z" />
        <path d="M7 7 C7 5 9 4 11 7 C9 10 7 9 7 7 Z" strokeOpacity="0.7" />
        <path d="M15 7 C15 5 13 4 11 7 C13 10 15 9 15 7 Z" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
