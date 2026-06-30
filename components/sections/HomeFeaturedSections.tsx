"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DestinationCard from "@/components/sections/DestinationCard";
import PackageCard from "@/components/sections/PackageCard";
import TestimonialCard from "@/components/sections/TestimonialCard";
import SectionHeading from "@/components/sections/SectionHeading";
import Button from "@/components/ui/Button";
import CarouselMarquee from "@/components/ui/CarouselMarquee";
import Reveal from "@/components/ui/motion/Reveal";
import ConvexConfigNotice from "@/components/convex/ConvexConfigNotice";
import { isConvexConfigured } from "@/lib/convex/url";
import {
  toDestinations,
  toPackages,
  toTestimonials,
} from "@/lib/convex/map";
import { selectFeaturedPackages } from "@/lib/packages/sort";

function LoadingBlock() {
  return (
    <div className="py-16 text-center text-ink-500">Loading content…</div>
  );
}

export default function HomeFeaturedSections() {
  const configured = isConvexConfigured();
  const destinationDocs = useQuery(
    api.destinations.list,
    configured ? {} : "skip",
  );
  const packageDocs = useQuery(api.packages.list, configured ? {} : "skip");
  const testimonialDocs = useQuery(
    api.testimonials.list,
    configured ? {} : "skip",
  );

  const featuredDestinations = useMemo(() => {
    if (!destinationDocs) return [];
    return toDestinations(destinationDocs).slice(0, 6);
  }, [destinationDocs]);

  const featuredPackages = useMemo(() => {
    if (!packageDocs) return [];
    return selectFeaturedPackages(toPackages(packageDocs), 3);
  }, [packageDocs]);

  const featuredTestimonials = useMemo(() => {
    if (!testimonialDocs) return [];
    return toTestimonials(testimonialDocs).slice(0, 3);
  }, [testimonialDocs]);

  const isLoading =
    configured &&
    (destinationDocs === undefined ||
      packageDocs === undefined ||
      testimonialDocs === undefined);

  if (!configured) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ConvexConfigNotice />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-sacred pattern-mandala">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Sacred Places"
            title="Destinations that transform"
            subtitle="From ancient ghats to Himalayan peaks — each destination tells a story of devotion, history, and wonder."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
            {featuredDestinations.map((destination, i) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                featured={i === 0}
              />
            ))}
          </div>
          <Reveal className="text-center">
            <Link href="/destinations">
              <Button variant="primary" size="lg">
                View All Destinations
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Curated Journeys"
            title="Packages crafted for your soul"
            subtitle="Every package includes accommodation, meals, expert guidance, and a day-by-day itinerary designed for transformation."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
          <Reveal className="text-center">
            <Link href="/packages">
              <Button variant="outline" size="lg">
                Browse All Packages
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-sacred">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Traveler Stories"
            title="Voices of transformation"
            subtitle="Real experiences from travelers who found something deeper in India."
          />
          <CarouselMarquee>
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </CarouselMarquee>
        </div>
      </section>
    </>
  );
}
