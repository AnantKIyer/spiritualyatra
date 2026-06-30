import Image from "next/image";
import Link from "next/link";
import { Package } from "@/types";
import Timeline from "@/components/sections/Timeline";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import Parallax from "@/components/ui/motion/Parallax";

interface PackageDetailsProps {
  package: Package;
}

export default function PackageDetails({ package: pkg }: PackageDetailsProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden -mt-20">
        <Parallax speed={0.2} className="absolute inset-0">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover scale-110"
            priority
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-hero" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-10 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-semibold rounded-full mb-4">
                {pkg.duration}
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                {pkg.name}
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
                {pkg.description}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-3xl md:text-4xl font-display text-saffron-300">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-white/60 text-sm ml-2">per person</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Destinations route */}
      <section className="py-12 border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <p className="text-ink-500 text-sm uppercase tracking-widest mb-4">
              Route
            </p>
            <div className="flex flex-wrap gap-3">
              {pkg.destinationIds.map((destId, i) => (
                <Link key={destId} href={`/destinations/${destId}`}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-sacred border border-saffron-200 rounded-full text-ink-800 text-sm font-medium hover:bg-saffron-50 hover:border-saffron-400 transition-colors">
                    <span className="w-5 h-5 rounded-full bg-saffron-500 text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {pkg.destinations[i]}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-ink-900">
              Package Highlights
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pkg.highlights.map((highlight, i) => (
              <Reveal key={highlight} delay={i * 0.05}>
                <div className="p-4 rounded-xl bg-ink-50 border border-ink-100 text-ink-800 text-sm font-medium">
                  {highlight}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
      {pkg.inclusions && pkg.inclusions.length > 0 && (
        <section className="py-12 bg-ink-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-ink-900">
                What&apos;s Included
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pkg.inclusions.map((item) => (
                <Reveal key={item}>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink-100">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5"
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
                    <span className="text-ink-700 text-sm">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Day-by-day Timeline */}
      {pkg.itinerary.length > 0 && (
        <Timeline
          days={pkg.itinerary}
          title="Your Day-by-Day Itinerary"
          subtitle="Scroll to explore each day"
        />
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-maroon-700 to-ink-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Ready to book {pkg.name}?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Contact us to plan your perfect spiritual journey with this
              package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-saffron-500 hover:bg-saffron-600"
                >
                  Book Now
                </Button>
              </Link>
              <Link href="/packages">
                <Button variant="outline-light" size="lg">
                  View All Packages
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
