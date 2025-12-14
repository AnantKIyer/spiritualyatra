"use client";

import { ReactNode, useState } from "react";

interface CarouselMarqueeProps {
  children: ReactNode[];
  className?: string;
}

export default function CarouselMarquee({
  children,
  className = "",
}: CarouselMarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate children multiple times for seamless loop
  const duplicatedChildren = [...children, ...children, ...children];

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="flex gap-6"
        style={{
          animation: isHovered ? "none" : "marquee 60s linear infinite",
          width: "max-content",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {duplicatedChildren.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: "calc((100vw - 4rem) / 3)",
              minWidth: "320px",
              maxWidth: "400px",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
