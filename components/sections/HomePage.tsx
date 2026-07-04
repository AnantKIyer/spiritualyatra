"use client";

import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/sections/HeroSection";
import HomeFeaturedSections from "@/components/sections/HomeFeaturedSections";
import SectionHeading from "@/components/sections/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";
import BentoGrid from "@/components/ui/bento/BentoGrid";
import BentoTile from "@/components/ui/bento/BentoTile";
import ArchFrame from "@/components/ui/ornament/ArchFrame";
import OrnamentalDivider from "@/components/ui/ornament/OrnamentalDivider";
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

      <section className="py-20 md:py-28 bg-silk-texture relative overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <OrnamentalDivider className="mb-10 text-gold-500" />
          <SectionHeading
            eyebrow="Why Spiritual Yatra"
            accent="यात्रा"
            title="More than a trip — a transformation"
            subtitle="We don't just show you India. We help you feel it."
          />

          <BentoGrid>
            <BentoTile tone="maroon" colSpan={2} rowSpan={2}>
              <span
                aria-hidden
                className="pointer-events-none absolute right-2 top-2 font-devanagari text-[110px] leading-[1.2] text-white/10 select-none"
              >
                ॐ
              </span>
              <div className="relative mt-auto">
                <p className="text-saffron-200 uppercase tracking-[0.2em] text-xs mb-3">
                  Our Promise
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3 leading-snug">
                  Journeys crafted with devotion, detail, and dharma
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                  Every yatra is shaped around your intention — blending sacred
                  tradition with effortless, modern comfort.
                </p>
              </div>
            </BentoTile>

            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <BentoTile key={benefit.title} tone="silk">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-3 shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-base md:text-lg text-ink-900 mb-1.5 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-ink-600 text-xs leading-relaxed line-clamp-3">
                    {benefit.description}
                  </p>
                </BentoTile>
              );
            })}

            <BentoTile tone="gold" colSpan={2}>
              <div className="flex items-center justify-between h-full gap-4">
                <div>
                  <p className="font-display text-3xl md:text-4xl text-earth-700 leading-none">
                    10,000+
                  </p>
                  <p className="text-earth-600 text-sm mt-2">
                    travelers guided across sacred India
                  </p>
                </div>
                <span className="font-devanagari text-5xl text-earth-700/30 select-none">
                  ✦
                </span>
              </div>
            </BentoTile>

            <BentoTile tone="earth" colSpan={2}>
              <div className="flex flex-col h-full justify-center">
                <span className="text-deva font-devanagari text-2xl md:text-3xl text-gold-foil mb-1">
                  अतिथि देवो भव
                </span>
                <p className="text-silk-200/80 text-sm">
                  “The guest is divine” — the spirit behind every journey we
                  design.
                </p>
              </div>
            </BentoTile>
          </BentoGrid>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-silk-texture relative overflow-hidden">
        <div className="absolute inset-0 pattern-mandala opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative neu-raised rounded-[32px] p-3">
                <ArchFrame
                  shape="pointed"
                  className="relative h-80 md:h-[500px]"
                >
                  <Image
                    src="/images/rishikesh_dest.jpeg"
                    alt="Discover India"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-saffron-300 text-sm uppercase tracking-widest mb-1">
                      Timeless History
                    </p>
                    <p className="font-display text-2xl text-white">
                      5,000 years of wisdom
                    </p>
                  </div>
                </ArchFrame>
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
            <OrnamentalDivider className="mb-8" tone="light" />
            <span className="text-deva font-devanagari text-xl text-gold-foil mb-2">
              शुभ यात्रा
            </span>
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
