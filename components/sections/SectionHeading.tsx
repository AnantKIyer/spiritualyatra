import Reveal from "@/components/ui/motion/Reveal";
import SacredMark from "@/components/ui/ornament/SacredMark";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Optional Devanagari accent shown faintly behind/above the title */
  accent?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  accent,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center mx-auto items-center",
    right: "text-right ml-auto items-end",
  }[align];

  return (
    <Reveal className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] mb-3 ${
            light ? "text-saffron-300" : "text-saffron-600"
          }`}
        >
          <SacredMark className="opacity-80" />
          {eyebrow}
          <SacredMark className="opacity-80 scale-x-[-1]" />
        </p>
      )}
      <div className="relative">
        {accent && (
          <span
            aria-hidden
            className={`text-deva pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-devanagari text-3xl md:text-4xl whitespace-nowrap ${
              light ? "text-white/10" : "text-maroon-500/10"
            }`}
          >
            {accent}
          </span>
        )}
        <h2
          className={`relative font-display text-3xl md:text-4xl lg:text-5xl leading-tight ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            light ? "text-white/80" : "text-ink-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
