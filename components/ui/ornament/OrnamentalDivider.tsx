import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
  /** Color tone of the ornament strokes */
  tone?: "gold" | "saffron" | "light";
}

const toneColor = {
  gold: "#C5A028",
  saffron: "#EA580C",
  light: "rgba(255,255,255,0.7)",
};

/**
 * A symmetric "bel" (vine) divider with a central lotus medallion —
 * used to separate sections with an Indian ornamental flourish.
 */
export default function OrnamentalDivider({
  className,
  tone = "gold",
}: OrnamentalDividerProps) {
  const color = toneColor[tone];

  return (
    <div
      className={cn("flex items-center justify-center py-2", className)}
      aria-hidden
    >
      <svg
        width="260"
        height="28"
        viewBox="0 0 260 28"
        fill="none"
        className="max-w-full"
      >
        <g stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <line x1="0" y1="14" x2="86" y2="14" strokeOpacity="0.35" />
          <path
            d="M86 14 C100 14 104 6 112 6 C118 6 120 11 116 14 C120 17 118 22 112 22 C104 22 100 14 86 14"
            strokeOpacity="0.6"
          />
          <line x1="174" y1="14" x2="260" y2="14" strokeOpacity="0.35" />
          <path
            d="M174 14 C160 14 156 6 148 6 C142 6 140 11 144 14 C140 17 142 22 148 22 C156 22 160 14 174 14"
            strokeOpacity="0.6"
          />
        </g>
        {/* central lotus / diya medallion */}
        <g fill={color}>
          <circle cx="130" cy="14" r="3.4" fillOpacity="0.9" />
          <path
            d="M130 3 C133 8 133 9 130 11 C127 9 127 8 130 3 Z"
            fillOpacity="0.7"
          />
          <path
            d="M130 25 C133 20 133 19 130 17 C127 19 127 20 130 25 Z"
            fillOpacity="0.7"
          />
          <path
            d="M119 14 C124 11 125 11 127 14 C125 17 124 17 119 14 Z"
            fillOpacity="0.7"
          />
          <path
            d="M141 14 C136 11 135 11 133 14 C135 17 136 17 141 14 Z"
            fillOpacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
