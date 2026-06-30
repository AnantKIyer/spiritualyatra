"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Destination } from "@/types";
import Reveal from "@/components/ui/motion/Reveal";

interface DestinationCardProps {
  destination: Destination;
  featured?: boolean;
}

const labelColors: Record<string, string> = {
  spiritual: "bg-maroon-100 text-maroon-700",
  romantic: "bg-pink-100 text-pink-700",
  historic: "bg-gold-100 text-gold-600",
  excursion: "bg-emerald-100 text-emerald-700",
  adventure: "bg-royal-blue-100 text-royal-blue-700",
};

export default function DestinationCard({
  destination,
  featured = false,
}: DestinationCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <Link href={`/destinations/${destination.id}`} className="block group h-full">
        <motion.article
          className="relative h-full overflow-hidden rounded-2xl bg-white border border-ink-200 shadow-md hover:shadow-indian-lg transition-shadow duration-500 flex flex-col"
          whileHover={shouldReduceMotion ? {} : { y: -6 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

            {featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-saffron-500 to-marigold-500 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-lg z-10">
                Editor&apos;s pick
              </span>
            )}

            {destination.labels && destination.labels.length > 0 && (
              <div
                className={`absolute left-4 flex flex-wrap gap-2 max-w-[70%] ${
                  featured ? "top-12" : "top-4"
                }`}
              >
                {destination.labels.slice(0, 2).map((label) => (
                  <span
                    key={label}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${labelColors[label] ?? "bg-ink-100 text-ink-700"}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {destination.basePrice && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-sm font-bold text-ink-900">
                  From ₹{destination.basePrice.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 md:p-6 flex flex-col flex-1">
            <h3
              className={`font-display text-ink-900 mb-1 group-hover:text-saffron-600 transition-colors ${
                featured ? "text-xl md:text-2xl" : "text-xl"
              }`}
            >
              {destination.name}
            </h3>
            <p className="text-ink-500 text-sm mb-3">{destination.location}</p>
            <p className="text-ink-600 text-sm line-clamp-2 leading-relaxed mb-4">
              {destination.description}
            </p>
            <div className="flex items-center justify-between">
              {destination.duration && (
                <span className="text-xs text-ink-500">
                  {destination.duration}
                </span>
              )}
              <span className="text-saffron-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </Reveal>
  );
}
