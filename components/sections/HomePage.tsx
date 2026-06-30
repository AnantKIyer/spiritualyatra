"use client";

import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/sections/HeroSection";
import HomeFeaturedSections from "@/components/sections/HomeFeaturedSections";
import SectionHeading from "@/components/sections/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import {
  CheckIcon,
  UsersIcon,
  ClockIcon,
  MapIcon,
} from "@/components/ui/Icons";

const benefits = [
  {
    icon: CheckIcon,
    title: "Authentic Experiences",
    description:
      "Curated journeys connecting you with genuine traditions across India's most sacred destinations.",
    color: "from-saffron-500 to-marigold-500",
  },
  {
    icon: UsersIcon,
    title: "Expert Guides",
    description:
      "Knowledgeable local guides who share deep insights into spiritual traditions and local culture.",
    color: "from-maroon-500 to-maroon-700",
  },
  {
    icon: ClockIcon,
    title: "Flexible Itineraries",
    description:
      "Customizable packages for every traveler — from weekend getaways to month-long pilgrimages.",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    icon: MapIcon,
    title: "30+ Destinations",
    description:
      "From Varanasi to the Rann of Kutch — explore India's spiritual, romantic, and adventure landscapes.",
    color: "from-royal-blue-500 to-royal-blue-700",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection heroImage="/images/varanasi_dest.webp" />

      <HomeFeaturedSections />

      <section className="py-20 md:py-28 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionHeading
            eyebrow="Why Spiritual Yatra"
            title="More than a trip — a transformation"
            subtitle="We don't just show you India. We help you feel it."
            light
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-indian-lg">
                <Image
                  src="/images/rishikesh_dest.jpeg"
                  alt="Discover India"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-saffron-300 text-sm uppercase tracking-widest mb-1">
                    Timeless History
                  </p>
                  <p className="font-display text-2xl text-white">
                    5,000 years of wisdom
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <p className="text-saffron-600 font-semibold uppercase tracking-widest text-sm mb-3">
                Discover India
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-ink-900 mb-6">
                Experience the sacred, the historic, and the extraordinary
              </h2>
              <p className="text-ink-600 leading-relaxed mb-6">
                From the ghats of Varanasi to the yoga capital of Rishikesh,
                explore India&apos;s most sacred destinations. Our expertly
                curated packages take you on a transformative journey through
                ancient traditions and spiritual practices.
              </p>
              <Link href="/destinations">
                <Button variant="primary" size="md">
                  Start Exploring
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-maroon-700 via-maroon-800 to-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 pattern-mandala opacity-20" />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
              Your spiritual journey awaits
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Whether you seek inner peace, cultural immersion, or adventure —
              let us craft the perfect yatra for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-saffron-500 hover:bg-saffron-600 min-w-[200px]"
                >
                  Plan My Journey
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  variant="outline-light"
                  size="lg"
                  className="min-w-[200px]"
                >
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
