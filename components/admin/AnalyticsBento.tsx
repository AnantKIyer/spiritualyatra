import Link from "next/link";
import { cn } from "@/lib/utils";

type Accent = "saffron" | "maroon" | "emerald" | "royal" | "ink" | "gold";

interface StatItem {
  label: string;
  value: string | number;
  sublabel?: string;
  href: string;
  accent: Accent;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

interface AnalyticsBentoProps {
  items: StatItem[];
}

const accentStyles: Record<
  Accent,
  { gradient: string; glow: string; icon: string }
> = {
  saffron: {
    gradient: "from-saffron-500/15 via-white to-marigold-500/10",
    glow: "group-hover:shadow-saffron-500/20",
    icon: "from-saffron-500 to-marigold-500",
  },
  maroon: {
    gradient: "from-maroon-500/15 via-white to-maroon-500/5",
    glow: "group-hover:shadow-maroon-500/20",
    icon: "from-maroon-500 to-maroon-700",
  },
  emerald: {
    gradient: "from-emerald-500/15 via-white to-emerald-500/5",
    glow: "group-hover:shadow-emerald-500/20",
    icon: "from-emerald-500 to-emerald-700",
  },
  royal: {
    gradient: "from-royal-blue-500/15 via-white to-royal-blue-500/5",
    glow: "group-hover:shadow-royal-blue-500/20",
    icon: "from-royal-blue-500 to-royal-blue-700",
  },
  ink: {
    gradient: "from-ink-500/10 via-white to-ink-500/5",
    glow: "group-hover:shadow-ink-500/15",
    icon: "from-ink-700 to-ink-900",
  },
  gold: {
    gradient: "from-marigold-500/20 via-white to-gold-400/10",
    glow: "group-hover:shadow-marigold-500/25",
    icon: "from-marigold-500 to-gold-500",
  },
};

function spanClass(colSpan: 1 | 2, rowSpan: 1 | 2) {
  const col =
    colSpan === 2 ? "col-span-2 md:col-span-2" : "col-span-1 md:col-span-1";
  const row = rowSpan === 2 ? "row-span-2" : "row-span-1";
  return `${col} ${row}`;
}

export default function AnalyticsBento({ items }: AnalyticsBentoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)] md:auto-rows-[140px]">
      {items.map((item) => {
        const styles = accentStyles[item.accent];
        const isLarge = item.colSpan === 2 && item.rowSpan === 2;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br p-5 md:p-6 shadow-sm transition-all duration-300",
              "hover:-translate-y-1 hover:border-saffron-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2",
              styles.gradient,
              styles.glow,
              spanClass(item.colSpan ?? 1, item.rowSpan ?? 1),
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={cn(
                  "rounded-xl bg-gradient-to-br shrink-0",
                  styles.icon,
                  isLarge ? "h-12 w-12" : "h-9 w-9",
                )}
              />
              <span className="text-ink-400 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                View details →
              </span>
            </div>

            <div className={isLarge ? "mt-auto" : "mt-3"}>
              <p
                className={cn(
                  "font-display text-ink-900",
                  isLarge ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl",
                )}
              >
                {item.value}
              </p>
              <p
                className={cn(
                  "text-ink-700 font-medium mt-1",
                  isLarge ? "text-base" : "text-sm",
                )}
              >
                {item.label}
              </p>
              {item.sublabel && (
                <p className="text-ink-500 text-xs mt-1">{item.sublabel}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
