import Image from "next/image";
import Link from "next/link";
import { Package } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card hover>
      {/* Image Section - Uniform height */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Section - Uniform padding */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Metadata */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-airbnb-black mb-1">
            {pkg.name}
          </h3>
          <p className="text-sm text-primary-600">{pkg.duration}</p>
        </div>

        {/* Description */}
        <p className="text-primary-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {pkg.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-primary-200 mb-4"></div>

        {/* Price */}
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-medium text-airbnb-black">
            ₹{pkg.price.toLocaleString()}
          </span>
          <span className="text-primary-600 text-sm ml-2">per person</span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded border border-primary-200"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Button - Always at bottom */}
        <div className="mt-auto">
          <Link href={`/packages/${pkg.id}`}>
            <Button variant="primary" size="sm" className="w-full">
              View details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
