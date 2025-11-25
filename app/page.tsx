import Link from 'next/link';
import Button from '@/components/ui/Button';
import DestinationCard from '@/components/sections/DestinationCard';
import TestimonialCard from '@/components/sections/TestimonialCard';
import { destinations } from '@/lib/data/destinations';
import { testimonials } from '@/lib/data/testimonials';

export default function Home() {
  const featuredDestinations = destinations.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-airbnb-black mb-6 leading-tight">
              Embark on a spiritual journey
            </h1>
            <p className="text-lg md:text-xl text-airbnb-black mb-8 max-w-2xl leading-relaxed">
              Discover India's most sacred destinations and experience the divine with our curated spiritual travel packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages">
                <Button variant="primary" size="lg">
                  Explore packages
                </Button>
              </Link>
              <Link href="/destinations">
                <Button variant="outline" size="lg">
                  View destinations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-airbnb-black mb-3">
              Featured destinations
            </h2>
            <p className="text-base text-airbnb-gray max-w-2xl">
              Explore the most sacred and spiritually significant places in India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/destinations">
              <Button variant="outline" size="md">
                Show all destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-airbnb-surface">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-airbnb-black mb-3 text-center">
              Why choose Spiritual Yatra?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-airbnb-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-airbnb-black">Authentic experiences</h3>
              <p className="text-airbnb-gray leading-relaxed">
                Curated spiritual journeys that connect you with authentic traditions and practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-airbnb-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-airbnb-black">Expert guides</h3>
              <p className="text-airbnb-gray leading-relaxed">
                Knowledgeable local guides who share deep insights into spiritual traditions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-airbnb-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-airbnb-black">Flexible packages</h3>
              <p className="text-airbnb-gray leading-relaxed">
                Customizable itineraries to suit your spiritual journey and schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-airbnb-black mb-3">
              What our travelers say
            </h2>
            <p className="text-base text-airbnb-gray max-w-2xl">
              Read about the transformative experiences of our spiritual journeyers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-airbnb-surface">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-airbnb-black mb-4">
            Ready to begin your spiritual journey?
          </h2>
          <p className="text-lg text-airbnb-gray mb-8 max-w-2xl mx-auto">
            Contact us today to plan your perfect spiritual pilgrimage
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
