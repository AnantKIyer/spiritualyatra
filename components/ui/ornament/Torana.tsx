import { cn } from "@/lib/utils";

interface ToranaProps {
  className?: string;
}

/**
 * A "bandhanwar" festoon — hanging marigold beads and mango leaves on a
 * gold cord, tiled across the full width. Purely decorative.
 */
export default function Torana({ className }: ToranaProps) {
  return (
    <div
      className={cn("w-full overflow-hidden leading-none", className)}
      aria-hidden
    >
      <svg
        width="100%"
        height="58"
        viewBox="0 0 96 58"
        preserveAspectRatio="xMidYMin meet"
        className="w-full"
        style={{ display: "block" }}
      >
        <defs>
          <pattern
            id="torana-unit"
            width="48"
            height="58"
            patternUnits="userSpaceOnUse"
          >
            {/* swag cord */}
            <path
              d="M0 4 Q24 22 48 4"
              fill="none"
              stroke="#C5A028"
              strokeWidth="2"
            />
            {/* hanging strings */}
            <line x1="12" y1="13" x2="12" y2="24" stroke="#A67C00" strokeWidth="1.4" />
            <line x1="36" y1="13" x2="36" y2="24" stroke="#A67C00" strokeWidth="1.4" />
            <line x1="24" y1="13" x2="24" y2="34" stroke="#A67C00" strokeWidth="1.4" />
            {/* marigold beads */}
            <circle cx="12" cy="29" r="6" fill="#F59E0B" />
            <circle cx="12" cy="29" r="3" fill="#EA580C" />
            <circle cx="36" cy="29" r="6" fill="#F59E0B" />
            <circle cx="36" cy="29" r="3" fill="#EA580C" />
            {/* central mango leaf */}
            <path
              d="M24 34 C18 40 18 48 24 52 C30 48 30 40 24 34 Z"
              fill="#9F1239"
            />
            <line x1="24" y1="36" x2="24" y2="50" stroke="#C5A028" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="96" height="58" fill="url(#torana-unit)" />
      </svg>
    </div>
  );
}
