import { packages } from '@/lib/data/packages';
import PackageCard from '@/components/sections/PackageCard';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Travel Packages - Spiritual Yatra',
  description: 'Browse our curated spiritual travel packages and find your perfect journey',
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-airbnb-black mb-4">
            Spiritual travel packages
          </h1>
          <p className="text-base md:text-lg text-airbnb-gray max-w-3xl">
            Choose from our carefully curated packages designed to provide authentic spiritual experiences. All packages include accommodation, meals, and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        <div className="bg-airbnb-surface rounded-xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-airbnb-black mb-3">
            Need a custom package?
          </h2>
          <p className="text-airbnb-gray mb-6 max-w-2xl mx-auto">
            We can create a personalized spiritual journey based on your preferences, schedule, and budget.
          </p>
          <a href="/contact">
            <Button variant="primary" size="md">
              Request custom package
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

