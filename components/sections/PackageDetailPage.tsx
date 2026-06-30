"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PackageDetails from "@/components/sections/PackageDetails";
import TrackView from "@/components/analytics/TrackView";
import ConvexConfigNotice from "@/components/convex/ConvexConfigNotice";
import { isConvexConfigured } from "@/lib/convex/url";
import { toPackage } from "@/lib/convex/map";

interface PackageDetailPageProps {
  params: Promise<{
    package: string;
  }>;
}

export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { package: packageId } = use(params);
  const configured = isConvexConfigured();
  const doc = useQuery(
    api.packages.getBySlug,
    configured ? { slug: packageId } : "skip",
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
      <div className="py-20 text-center text-ink-500">Loading package…</div>
    );
  }

  if (doc === null) {
    notFound();
  }

  return (
    <>
      <TrackView packageSlug={packageId} />
      <PackageDetails package={toPackage(doc)} />
    </>
  );
}
