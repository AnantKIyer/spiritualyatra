import { packages } from "@/lib/data/packages";
import PackageCard from "@/components/sections/PackageCard";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Travel Packages - Spiritual Yatra",
  description:
    "Browse our curated spiritual travel packages and find your perfect journey",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/30 via-white to-emerald-50/30"></div>
      <div className="absolute inset-0 pattern-dots opacity-20"></div>
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-saffron-500 to-maroon-600"></div>
              <span className="text-4xl">✈️</span>
              <div className="w-16 h-1 bg-gradient-to-r from-maroon-600 via-royal-blue-500 to-transparent"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Spiritual travel packages
          </h1>
          <p className="text-base md:text-lg text-airbnb-gray max-w-3xl mx-auto font-medium">
            Choose from our carefully curated packages designed to provide
            authentic spiritual experiences. All packages include accommodation,
            meals, and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 text-center border-4 border-gradient-to-r from-saffron-200 via-maroon-200 to-royal-blue-200 shadow-indian-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron-200/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Need a custom package?
            </h2>
            <p className="text-airbnb-gray mb-8 max-w-2xl mx-auto font-medium">
              We can create a personalized spiritual journey based on your
              preferences, schedule, and budget.
            </p>
            <a href="/contact">
              <Button variant="primary" size="md">
                ✨ Request custom package
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
