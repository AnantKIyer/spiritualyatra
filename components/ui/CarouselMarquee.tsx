"use client";

import React from "react";

interface CarouselMarqueeProps {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
}

export default function CarouselMarquee({
  children,
  speed = "normal",
}: CarouselMarqueeProps) {
  const speedClasses = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  };

  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-6 ${speedClasses[speed]}`}>
        {/* First set of children */}
        <div className="flex gap-6 shrink-0">
          {React.Children.map(children, (child, index) => (
            <div key={`first-${index}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-6 shrink-0" aria-hidden="true">
          {React.Children.map(children, (child, index) => (
            <div key={`second-${index}`} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
