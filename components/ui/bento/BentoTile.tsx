import { cn } from "@/lib/utils";

type Span = 1 | 2 | 3 | 4;
type Tone = "silk" | "maroon" | "gold" | "earth";

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: Span;
  rowSpan?: Span;
  tone?: Tone;
}

const colSpanClass: Record<Span, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-2 md:col-span-3",
  4: "col-span-2 md:col-span-4",
};

const rowSpanClass: Record<Span, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
};

const toneClass: Record<Tone, string> = {
  silk: "neu-raised neu-raised-hover text-ink-800",
  maroon:
    "bg-gradient-to-br from-maroon-500 to-maroon-700 text-white shadow-indian-lg",
  gold: "bg-gold-foil text-earth-700 shadow-gold-glow",
  earth: "bg-earth-texture text-silk-100 shadow-elevation-3",
};

export default function BentoTile({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  tone = "silk",
}: BentoTileProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-5 md:p-6 flex flex-col",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        toneClass[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
