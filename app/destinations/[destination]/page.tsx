import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import DestinationDetails from "@/components/sections/DestinationDetails";
import { toDestination } from "@/lib/convex/map";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    destination: string;
  }>;
}

export default async function DestinationPage({ params }: PageProps) {
  const { destination: destinationId } = await params;
  const doc = await fetchQuery(api.destinations.getBySlug, {
    slug: destinationId,
  });

  if (!doc) {
    notFound();
  }

  return <DestinationDetails destination={toDestination(doc)} />;
}
