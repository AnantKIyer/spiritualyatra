import Link from "next/link";
import Image from "next/image";
import PackagesGrid from "@/components/sections/PackagesGrid";
import SectionHeading from "@/components/sections/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/motion/Reveal";

export const metadata = {
  title: "Travel Packages - Spiritual Yatra",
  description:
    "Browse our curated spiritual travel packages and find your perfect journey",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen relative bg-white">
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden -mt-20">
        <Image
          src="/images/rishikesh_dest.jpeg"
          alt="Travel packages"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 w-full">
            <Reveal>
              <p className="text-saffron-300 uppercase tracking-widest text-sm mb-3">
                Curated Journeys
              </p>
              <h1 className="font-display text-4xl md:text-6xl text-white mb-3">
                Spiritual Travel Packages
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Choose from carefully curated packages with day-by-day
                itineraries, expert guidance, and transformative experiences.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        <SectionHeading
          eyebrow="All Packages"
          title="Find your perfect yatra"
          subtitle="Every package includes accommodation, meals, expert guidance, and a detailed day-by-day itinerary."
        />

        <PackagesGrid />

        <Reveal>
          <div className="bg-gradient-to-br from-saffron-50 via-white to-marigold-50 rounded-2xl p-10 text-center border border-saffron-200 shadow-indian-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-saffron-200/30 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-3">
                Need a custom package?
              </h2>
              <p className="text-ink-600 mb-8 max-w-2xl mx-auto">
                We can create a personalized spiritual journey based on your
                preferences, schedule, and budget.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Request Custom Package
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
