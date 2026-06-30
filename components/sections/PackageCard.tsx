"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Package } from "@/types";
import Reveal from "@/components/ui/motion/Reveal";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const track = useMutation(api.packageEvents.track);

  function handleClick() {
    void track({ type: "click", packageSlug: pkg.id });
  }

  return (
    <Reveal>
      <Link
        href={`/packages/${pkg.id}`}
        className="block group h-full"
        onClick={handleClick}
      >
        <motion.article
          className="relative h-full overflow-hidden rounded-2xl bg-white border border-ink-200 shadow-md hover:shadow-indian-lg transition-shadow duration-500 flex flex-col"
          whileHover={shouldReduceMotion ? {} : { y: -6 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={pkg.image}
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            {pkg.boosted && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-saffron-500 to-marigold-500 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wide">
                Featured
              </span>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-semibold rounded-full mb-2">
                {pkg.duration}
              </span>
              <h3 className="font-display text-xl text-white">{pkg.name}</h3>
            </div>
          </div>

          <div className="p-5 md:p-6 flex flex-col flex-grow">
            <p className="text-ink-600 text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
              {pkg.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {pkg.destinations.slice(0, 3).map((dest) => (
                <span
                  key={dest}
                  className="px-2 py-0.5 bg-ink-100 text-ink-600 text-xs rounded-md"
                >
                  {dest}
                </span>
              ))}
              {pkg.destinations.length > 3 && (
                <span className="px-2 py-0.5 bg-ink-100 text-ink-500 text-xs rounded-md">
                  +{pkg.destinations.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-ink-100">
              <div>
                <span className="text-2xl font-bold text-ink-900">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="text-ink-500 text-xs ml-1">/ person</span>
              </div>
              <span className="text-saffron-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View
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
