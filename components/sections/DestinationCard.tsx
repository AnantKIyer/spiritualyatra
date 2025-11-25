import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card hover>
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-airbnb-black mb-1">{destination.name}</h3>
          <p className="text-sm text-airbnb-gray">{destination.location}</p>
        </div>
        <p className="text-airbnb-black text-sm mb-4 line-clamp-2 leading-snug">{destination.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.highlights.slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-airbnb-surface text-airbnb-black text-xs font-medium rounded-md"
            >
              {highlight}
            </span>
          ))}
        </div>
        <Link href={`/destinations/${destination.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            Learn more
          </Button>
        </Link>
      </div>
    </Card>
  );
}

