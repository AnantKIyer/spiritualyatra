"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DestinationDetails from "@/components/sections/DestinationDetails";
import ConvexConfigNotice from "@/components/convex/ConvexConfigNotice";
import { isConvexConfigured } from "@/lib/convex/url";
import { toDestination } from "@/lib/convex/map";

interface DestinationDetailPageProps {
  params: Promise<{
    destination: string;
  }>;
}

export default function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { destination: destinationId } = use(params);
  const configured = isConvexConfigured();
  const doc = useQuery(
    api.destinations.getBySlug,
    configured ? { slug: destinationId } : "skip",
  );

  if (!configured) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <ConvexConfigNotice />
      </div>
    );
  }

  if (doc === undefined) {
    return (
      <div className="py-20 text-center text-ink-500">
        Loading destination…
      </div>
    );
  }

  if (doc === null) {
    notFound();
  }

  return <DestinationDetails destination={toDestination(doc)} />;
}
