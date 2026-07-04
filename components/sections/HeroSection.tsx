"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import StatCounter from "@/components/ui/motion/StatCounter";
import Torana from "@/components/ui/ornament/Torana";

interface HeroSectionProps {
  heroImage: string;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden -mt-20"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={shouldReduceMotion ? {} : { y }}
      >
        <Image
          src={heroImage}
          alt="Spiritual Journey across India"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/40 via-transparent to-saffron-900/20" />
      </motion.div>

      {/* Festoon across the top */}
      <div className="absolute top-20 left-0 right-0 z-20 px-2 opacity-90 drop-shadow-lg">
        <Torana />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 md:pb-28"
        style={shouldReduceMotion ? {} : { opacity }}
      >
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5">
            <span className="text-deva font-devanagari text-2xl md:text-3xl text-gold-foil">
              सत्यं शिवं सुन्दरम्
            </span>
          </p>
          <p className="text-saffron-300 font-medium uppercase tracking-[0.3em] text-sm mb-6">
            Discover Sacred India
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 max-w-4xl">
            Your soul&apos;s journey{" "}
            <span className="text-gold-foil">begins here</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
            From the ghats of Varanasi to the peaks of the Himalayas — curated
            spiritual journeys that transform the way you see India, and
            yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/packages">
              <Button
                variant="primary"
                size="lg"
                className="bg-saffron-500 hover:bg-saffron-600 shadow-indian-lg min-w-[180px]"
              >
                Explore Packages
              </Button>
            </Link>
            <Link href="/destinations">
              <Button
                variant="outline-light"
                size="lg"
                className="min-w-[180px]"
              >
                View Destinations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <StatCounter
                value={30}
                suffix="+"
                className="text-3xl md:text-4xl font-display text-white block"
              />
              <span className="text-white/70 text-sm mt-1 block">
                Destinations
              </span>
            </div>
            <div>
              <StatCounter
                value={10}
                suffix="k+"
                className="text-3xl md:text-4xl font-display text-white block"
              />
              <span className="text-white/70 text-sm mt-1 block">
                Travelers
              </span>
            </div>
            <div>
              <StatCounter
                value={6}
                className="text-3xl md:text-4xl font-display text-white block"
              />
              <span className="text-white/70 text-sm mt-1 block">
                Curated Yatras
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
