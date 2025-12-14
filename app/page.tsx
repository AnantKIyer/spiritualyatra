"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import DestinationCard from "@/components/sections/DestinationCard";
import TestimonialCard from "@/components/sections/TestimonialCard";
import { destinations } from "@/lib/data/destinations";
import { testimonials } from "@/lib/data/testimonials";
import {
  CheckIcon,
  UsersIcon,
  ClockIcon,
  MapIcon,
} from "@/components/ui/Icons";
import CarouselMarquee from "@/components/ui/CarouselMarquee";
import MapTrail from "@/components/ui/MapTrail";
import { useEffect, useRef } from "react";

export default function Home() {
  const featuredDestinations = destinations.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Random interactive element: subtle parallax on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Statistics data
  const stats = [
    { value: "10k+", label: "Happy Travelers" },
    { value: "500+", label: "Custom Tours" },
    { value: "5k+", label: "Hotel Stays Arranged" },
  ];

  return (
    <div className="relative">
      <MapTrail />

      {/* Hero Section - Large background image with overlay - Left aligned */}
      <section
        className="relative min-h-screen flex items-center justify-start overflow-hidden -mt-20"
        ref={heroRef}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredDestinations[0]?.image || "/images/varanasi_dest.webp"}
            alt="Spiritual Journey"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-tight text-left">
              SPIRITUAL YATRA
            </h1>

            {/* Statistics */}
            <div className="flex flex-wrap gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-3xl md:text-4xl font-medium mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl leading-relaxed">
              Journey across continents, cultures, and landscapes—because every
              path leads to new discoveries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages">
                <Button variant="primary" size="lg">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations - Right aligned heading */}
      <section className="py-20 md:py-28 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 text-right">
            <div className="flex items-center justify-end gap-3 mb-4">
              <h2 className="text-3xl md:text-4xl font-medium text-airbnb-black">
                Featured destinations
              </h2>
              <MapIcon className="w-8 h-8 text-accent-500" />
            </div>
            <p className="text-base text-primary-600 max-w-2xl ml-auto">
              Explore the most sacred and spiritually significant places in
              India
            </p>
          </div>
          <div className="mb-12">
            <CarouselMarquee>
              {featuredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </CarouselMarquee>
          </div>
          <div className="text-center">
            <Link href="/destinations">
              <Button variant="primary" size="md">
                Explore now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Right aligned heading with large featured card + smaller benefit cards */}
      <section className="py-20 md:py-28 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 text-right">
            <h2 className="text-3xl md:text-4xl font-medium text-airbnb-black mb-3">
              Why choose Spiritual Yatra?
            </h2>
            <p className="text-base text-primary-600 max-w-2xl ml-auto">
              Experience authentic spiritual journeys with expert guidance
            </p>
          </div>

          {/* Large Featured Card */}
          <div className="mb-12">
            <div className="bg-white rounded-lg border border-primary-200 material-elevation-2 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-96">
                  <Image
                    src={
                      featuredDestinations[1]?.image ||
                      "/images/rishikesh_dest.jpeg"
                    }
                    alt="Why Choose Spiritual Yatra"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-medium text-airbnb-black mb-4">
                    Journey across continents, cultures, and landscapes
                  </h3>
                  <p className="text-primary-600 mb-6 leading-relaxed">
                    Discover India&apos;s most sacred destinations and
                    experience the divine with our curated spiritual travel
                    packages. Journey through ancient traditions, vibrant
                    cultures, and timeless spirituality.
                  </p>
                  <Link href="/packages">
                    <Button variant="outline" size="md">
                      Explore More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Benefit Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Trusted Network",
                description:
                  "Curated spiritual journeys that connect you with authentic traditions and practices across India's most sacred destinations.",
                icon: CheckIcon,
                bgColor: "bg-accent-50",
                iconBg: "bg-accent-100",
                iconColor: "text-accent-600",
              },
              {
                number: "02",
                title: "Exclusive Benefits",
                description:
                  "Knowledgeable local guides who share deep insights into spiritual traditions and provide personalized experiences.",
                icon: UsersIcon,
                bgColor: "bg-secondary-50",
                iconBg: "bg-secondary-100",
                iconColor: "text-secondary-600",
              },
              {
                number: "03",
                title: "Expand Your Reach",
                description:
                  "Customizable itineraries to suit your spiritual journey and schedule, with flexible packages for every traveler.",
                icon: ClockIcon,
                bgColor: "bg-accent-50",
                iconBg: "bg-accent-100",
                iconColor: "text-accent-600",
              },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-primary-200 material-elevation-2 hover:material-elevation-3 transition-all duration-200 hover:-translate-y-1 flex flex-col overflow-hidden"
                  style={{ minHeight: "400px" }}
                >
                  {/* Number and Icon Section */}
                  <div
                    className={`relative h-32 w-full ${benefit.bgColor} flex items-center justify-between px-6`}
                  >
                    <span className="text-4xl font-medium text-primary-300">
                      {benefit.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-full ${benefit.iconBg} flex items-center justify-center`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${benefit.iconColor}`}
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-airbnb-black mb-3">
                      {benefit.title}
                    </h3>
                    <div className="h-px bg-primary-200 mb-4"></div>
                    <p className="text-primary-600 text-sm leading-relaxed mb-6 flex-grow">
                      {benefit.description}
                    </p>
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" className="w-full">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discover Section - Left aligned heading with large image */}
      <section className="py-20 md:py-28 bg-primary-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 text-left">
            <div className="text-sm md:text-base text-accent-500 font-medium mb-2 uppercase tracking-wide">
              TIMELESS HISTORY
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-airbnb-black mb-3">
              Discover India with Us
            </h2>
            <p className="text-base text-primary-600 max-w-2xl leading-relaxed">
              Journey through ancient traditions, vibrant cultures, and timeless
              spirituality. Experience the divine with our curated spiritual
              travel packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden material-elevation-2">
              <Image
                src={
                  featuredDestinations[2]?.image || "/images/haridwar_dest.jpg"
                }
                alt="Discover India"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-airbnb-black mb-4">
                Experience the Sacred
              </h3>
              <p className="text-primary-600 mb-6 leading-relaxed">
                From the ghats of Varanasi to the yoga capital of Rishikesh,
                explore India&apos;s most sacred destinations. Our expertly
                curated packages take you on a transformative journey through
                ancient traditions and spiritual practices.
              </p>
              <p className="text-primary-600 mb-8 leading-relaxed">
                Whether you seek inner peace, cultural immersion, or a deeper
                connection with the divine, Spiritual Yatra offers authentic
                experiences that will leave a lasting impact on your soul.
              </p>
              <Link href="/destinations">
                <Button variant="primary" size="md">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Material Design Cards - Right aligned heading */}
      <section className="py-20 md:py-28 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 text-right">
            <h2 className="text-3xl md:text-4xl font-medium text-airbnb-black mb-3">
              What our travelers say
            </h2>
            <p className="text-base text-primary-600 max-w-2xl ml-auto">
              Read about the transformative experiences of our spiritual
              journeyers
            </p>
          </div>
          <CarouselMarquee>
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </CarouselMarquee>
        </div>
      </section>

      {/* CTA Section - Right aligned with dark background */}
      <section className="py-20 md:py-28 bg-primary-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl ml-auto text-right">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Plan Your Spiritual Journey
            </h2>
            <p className="text-lg text-white/90 mb-10">
              Explore the sacred sites, cruise the Ganges, and uncover ancient
              wonders with our expertly curated travel. Book your dream trip
              today!
            </p>
            <div className="text-right">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
