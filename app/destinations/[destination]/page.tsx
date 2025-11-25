import { notFound } from 'next/navigation';
import { destinations, getDestinationById } from '@/lib/data/destinations';
import DestinationDetails from '@/components/sections/DestinationDetails';

interface PageProps {
  params: {
    destination: string;
  };
}

export function generateStaticParams() {
  return destinations.map((destination) => ({
    destination: destination.id,
  }));
}

export default function DestinationPage({ params }: PageProps) {
  const destination = getDestinationById(params.destination);

  if (!destination) {
    notFound();
  }

  return <DestinationDetails destination={destination} />;
}

