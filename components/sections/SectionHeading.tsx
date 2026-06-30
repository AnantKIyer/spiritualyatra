import Reveal from "@/components/ui/motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }[align];

  return (
    <Reveal className={`max-w-3xl mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-saffron-300" : "text-saffron-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
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
