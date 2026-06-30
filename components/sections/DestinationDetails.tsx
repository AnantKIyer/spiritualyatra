"use client";

import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types";
import Timeline from "@/components/sections/Timeline";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import Parallax from "@/components/ui/motion/Parallax";

interface DestinationDetailsProps {
  destination: Destination;
}

export default function DestinationDetails({
  destination,
}: DestinationDetailsProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden -mt-20">
        <Parallax speed={0.2} className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover scale-110"
            priority
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-10 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              {destination.labels && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.labels.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
                {destination.description}
              </p>
              <div className="flex flex-wrap gap-6 text-white/70 text-sm">
                <span>📍 {destination.location}</span>
                {destination.duration && <span>⏱ {destination.duration}</span>}
                {destination.bestTime && (
                  <span>🌤 Best: {destination.bestTime}</span>
                )}
                {destination.basePrice && (
                  <span className="text-saffron-300 font-semibold">
                    From ₹{destination.basePrice.toLocaleString()}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Long Description + Quick Facts */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <Reveal className="lg:col-span-2">
              <p className="text-saffron-600 font-semibold uppercase tracking-widest text-sm mb-4">
                About {destination.name}
              </p>
              <p className="text-ink-700 text-lg leading-relaxed">
                {destination.longDescription}
              </p>
            </Reveal>
            <Reveal direction="right">
              <div className="bg-gradient-sacred rounded-2xl p-6 border border-saffron-100 space-y-4">
                <h3 className="font-display text-lg text-ink-900">
                  Quick Facts
                </h3>
                {destination.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-500">Duration</span>
                    <span className="font-medium text-ink-900">
                      {destination.duration}
                    </span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-500">Best Time</span>
                    <span className="font-medium text-ink-900">
                      {destination.bestTime}
                    </span>
                  </div>
                )}
                {destination.basePrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-500">Starting From</span>
                    <span className="font-bold text-saffron-600">
                      ₹{destination.basePrice.toLocaleString()}
                    </span>
                  </div>
                )}
                <Link href="/contact" className="block pt-2">
                  <Button variant="primary" size="sm" className="w-full">
                    Plan This Trip
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {destination.gallery && destination.gallery.length > 1 && (
        <section className="py-12 bg-ink-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-ink-900">
                Gallery
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.gallery.slice(0, 6).map((img, i) => (
                <Reveal key={img} delay={i * 0.05}>
                  <div
                    className={`relative rounded-xl overflow-hidden ${
                      i === 0
                        ? "col-span-2 row-span-2 h-64 md:h-80"
                        : "h-40 md:h-48"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${destination.name} gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-2">
              Highlights
            </h2>
            <p className="text-ink-600">
              What makes {destination.name} unforgettable
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.highlights.map((highlight, i) => (
              <Reveal key={highlight} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-sacred border border-saffron-100 hover:shadow-indian-lg transition-shadow">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-saffron-500 text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-ink-800 font-medium">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Timeline */}
      {destination.tripPlan.length > 0 && (
        <div className="bg-ink-50">
          <Timeline
            days={destination.tripPlan}
            title={`Your ${destination.name} Itinerary`}
            subtitle="Day by day"
          />
        </div>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-maroon-700 to-ink-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Ready to visit {destination.name}?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Let us craft your perfect spiritual journey with expert guides,
              curated stays, and seamless logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-saffron-500 hover:bg-saffron-600"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="outline-light" size="lg">
                  View Packages
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
