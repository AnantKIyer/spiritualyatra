import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import DestinationsClient from "@/components/sections/DestinationsClient";
import Reveal from "@/components/ui/motion/Reveal";

export const metadata = {
  title: "Destinations - Spiritual Yatra",
  description: "Explore sacred spiritual destinations across India",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic header */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden -mt-20">
        <Image
          src="/images/varanasi_dest.webp"
          alt="Sacred destinations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
            <Reveal>
              <p className="text-saffron-300 uppercase tracking-widest text-sm mb-3">
                Explore India
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white mb-3">
                Sacred Destinations
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Discover the most spiritually significant places in India — each
                offering a unique journey of self-discovery.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        <DestinationsClient />

        <Reveal>
          <div className="bg-gradient-sacred rounded-2xl p-10 text-center border border-saffron-100 mt-8">
            <h2 className="font-display text-2xl text-ink-900 mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-ink-600 mb-6 max-w-2xl mx-auto">
              We offer custom spiritual journeys tailored to your needs.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="md">
                Contact Us
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
