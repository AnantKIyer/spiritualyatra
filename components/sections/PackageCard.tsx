import Image from 'next/image';
import Link from 'next/link';
import { Package } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card hover>
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-airbnb-black mb-1">{pkg.name}</h3>
          <p className="text-sm text-airbnb-gray">{pkg.duration}</p>
        </div>
        <p className="text-airbnb-black text-sm mb-4 line-clamp-2 leading-snug">{pkg.description}</p>
        <div className="flex items-baseline mb-4 pb-4 border-b border-airbnb-border">
          <div>
            <span className="text-2xl font-semibold text-airbnb-black">
              ₹{pkg.price.toLocaleString()}
            </span>
            <span className="text-airbnb-gray text-sm ml-1">per person</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-airbnb-surface text-airbnb-black text-xs font-medium rounded-md"
            >
              {highlight}
            </span>
          ))}
        </div>
        <Link href={`/packages/${pkg.id}`}>
          <Button variant="primary" size="sm" className="w-full">
            View details
          </Button>
        </Link>
      </div>
    </Card>
  );
}

