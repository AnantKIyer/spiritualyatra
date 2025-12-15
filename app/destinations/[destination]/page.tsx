import { use } from "react";
import { notFound } from "next/navigation";
import { destinations, getDestinationById } from "@/lib/data/destinations";
import DestinationDetails from "@/components/sections/DestinationDetails";

interface PageProps {
  params: Promise<{
    destination: string;
  }>;
}

export function generateStaticParams() {
  return destinations.map((destination) => ({
    destination: destination.id,
  }));
}

export default function DestinationPage({ params }: PageProps) {
  const { destination: destinationId } = use(params);
  const destination = getDestinationById(destinationId);

  if (!destination) {
    notFound();
  }

  return <DestinationDetails destination={destination} />;
}
