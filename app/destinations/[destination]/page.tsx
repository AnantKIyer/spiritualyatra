import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import DestinationDetails from "@/components/sections/DestinationDetails";
import { toDestination } from "@/lib/convex/map";

interface PageProps {
  params: Promise<{
    destination: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await fetchQuery(api.destinations.listSlugs);
  return slugs.map((destination) => ({ destination }));
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
