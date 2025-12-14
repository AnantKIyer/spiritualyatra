import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LocationIcon } from "@/components/ui/Icons";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card hover>
      {/* Image Section - Uniform height */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 material-elevation-2">
          <LocationIcon className="w-4 h-4 text-accent-500" />
        </div>
      </div>

      {/* Content Section - Uniform padding */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title and Metadata */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-airbnb-black mb-1">
            {destination.name}
          </h3>
          <p className="text-sm text-primary-600 flex items-center gap-1">
            <LocationIcon className="w-4 h-4" />
            {destination.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-primary-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-primary-200 mb-4"></div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {destination.highlights.slice(0, 2).map((highlight, index) => (
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
          <Link href={`/destinations/${destination.id}`}>
            <Button variant="outline" size="sm" className="w-full">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
