"use client";

import { Testimonial } from "@/types";
import { StarIcon, QuoteIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
import { useEffect, useRef } from "react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Random interactive: subtle tilt on hover
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (card) {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg border border-primary-200 material-elevation-2 hover:material-elevation-3 transition-all duration-200 flex flex-col overflow-hidden"
      style={{ minHeight: "500px" }}
    >
      {/* Image/Icon Section - Uniform height */}
      <div className="relative h-48 w-full bg-primary-50 flex items-center justify-center">
        <QuoteIcon className="w-16 h-16 text-primary-300" />
      </div>

      {/* Content Section - Uniform padding */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-secondary-500" filled />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-200 mb-4"></div>

        {/* Content */}
        <p className="text-airbnb-black mb-6 text-sm leading-relaxed line-clamp-4">
          "{testimonial.content}"
        </p>

        {/* Author Info */}
        <div className="mb-6">
          <p className="font-medium text-airbnb-black mb-1">
            {testimonial.name}
          </p>
          <p className="text-sm text-primary-600">{testimonial.location}</p>
        </div>

        {/* Button - Always at bottom */}
        <div className="mt-auto">
          <Button variant="outline" size="sm" className="w-full">
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
}
