"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/motion/Reveal";

export interface TimelineDay {
  day: string;
  title: string;
  location?: string;
  description: string;
  activities: string[];
}

interface TimelineProps {
  days: TimelineDay[];
  title?: string;
  subtitle?: string;
}

export default function Timeline({
  days,
  title = "Your Journey",
  subtitle = "Day by day, moment by moment",
}: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    dayRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [days.length]);

  return (
    <section className="py-16 md:py-24">
      <Reveal className="text-center mb-12 md:mb-16">
        <p className="text-saffron-600 font-medium uppercase tracking-widest text-sm mb-2">
          {subtitle}
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink-900">
          {title}
        </h2>
      </Reveal>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          {/* Sticky day rail */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-2">
              {days.map((day, index) => (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => {
                    dayRefs.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-saffron-500 text-white shadow-indian-lg"
                      : "text-ink-600 hover:bg-saffron-50 hover:text-saffron-700"
                  }`}
                >
                  <span className="block text-xs font-medium uppercase tracking-wide opacity-80">
                    {day.day}
                  </span>
                  <span className="block text-sm font-semibold truncate mt-0.5">
                    {day.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Day cards */}
          <div className="space-y-8">
            {days.map((day, index) => (
              <div
                key={`${day.day}-${index}`}
                ref={(el) => {
                  dayRefs.current[index] = el;
                }}
              >
                <Reveal delay={shouldReduceMotion ? 0 : index * 0.05}>
                  <motion.div
                    className={`relative rounded-2xl border p-6 md:p-8 transition-all duration-500 ${
                      activeIndex === index
                        ? "border-saffron-300 bg-gradient-to-br from-saffron-50 to-white shadow-indian-lg"
                        : "border-ink-200 bg-white"
                    }`}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: activeIndex === index ? 1 : 0.98,
                            opacity: activeIndex === index ? 1 : 0.85,
                          }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute -left-3 top-8 hidden lg:flex w-6 h-6 rounded-full bg-saffron-500 border-4 border-white shadow-md items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-saffron-100 text-saffron-700 text-xs font-semibold uppercase tracking-wide">
                        {day.day}
                      </span>
                      {day.location && (
                        <span className="text-ink-500 text-sm">
                          📍 {day.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-ink-900 mb-3">
                      {day.title}
                    </h3>
                    <p className="text-ink-600 leading-relaxed mb-6">
                      {day.description}
                    </p>

                    <ul className="space-y-3">
                      {day.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-3 text-ink-700"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="text-sm md:text-base">
                            {activity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
