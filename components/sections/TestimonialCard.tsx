"use client";

import { Testimonial } from "@/types";
import { StarIcon, QuoteIcon } from "@/components/ui/Icons";
import Reveal from "@/components/ui/motion/Reveal";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Reveal>
      <article className="bg-white rounded-2xl border border-ink-200 shadow-md hover:shadow-indian-lg transition-shadow duration-300 flex flex-col overflow-hidden min-h-[420px] w-[340px] flex-shrink-0">
        <div className="p-6 flex flex-col flex-grow">
          <QuoteIcon className="w-8 h-8 text-saffron-200 mb-4" />

          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <StarIcon
                key={`star-${i}`}
                className="w-4 h-4 text-marigold-500"
                filled={true}
              />
            ))}
          </div>

          <p className="text-ink-700 text-sm leading-relaxed line-clamp-5 flex-grow mb-6">
            &ldquo;{testimonial.content}&rdquo;
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-maroon-500 flex items-center justify-center text-white text-sm font-bold">
              {testimonial.avatar ?? testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-ink-900 text-sm">
                {testimonial.name}
              </p>
              <p className="text-ink-500 text-xs">{testimonial.location}</p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
