import { destinations } from '@/lib/data/destinations';
import DestinationCard from '@/components/sections/DestinationCard';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Destinations - Spiritual Yatra',
  description: 'Explore sacred spiritual destinations across India',
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-airbnb-black mb-4">
            Sacred destinations
          </h1>
          <p className="text-base md:text-lg text-airbnb-gray max-w-3xl">
            Discover the most spiritually significant places in India. Each destination offers a unique journey of self-discovery and divine connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        <div className="bg-airbnb-surface rounded-xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-airbnb-black mb-3">
            Can't find what you're looking for?
          </h2>
          <p className="text-airbnb-gray mb-6 max-w-2xl mx-auto">
            We offer custom spiritual journeys tailored to your needs. Contact us to create your perfect pilgrimage.
          </p>
          <a
            href="/contact"
            className="inline-block"
          >
            <Button variant="primary" size="md">
              Contact us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

