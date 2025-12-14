import Button from "@/components/ui/Button";
import DestinationsClient from "@/components/sections/DestinationsClient";

export const metadata = {
  title: "Destinations - Spiritual Yatra",
  description: "Explore sacred spiritual destinations across India",
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
            Discover the most spiritually significant places in India. Each
            destination offers a unique journey of self-discovery and divine
            connection.
          </p>
        </div>

        <DestinationsClient />

        <div className="bg-yellow-50 rounded-xl p-10 text-center border border-yellow-100 mt-12">
          <h2 className="text-2xl font-semibold text-airbnb-black mb-3">
            Can't find what you're looking for?
          </h2>
          <p className="text-airbnb-gray mb-6 max-w-2xl mx-auto">
            We offer custom spiritual journeys tailored to your needs. Contact
            us to create your perfect pilgrimage.
          </p>
          <a href="/contact" className="inline-block">
            <Button variant="primary" size="md">
              Contact us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
