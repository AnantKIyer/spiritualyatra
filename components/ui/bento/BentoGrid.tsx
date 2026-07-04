import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive bento layout. Tiles control their own span via BentoTile.
 */
export default function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-4 md:gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
