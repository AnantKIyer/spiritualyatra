import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import PackageDetails from "@/components/sections/PackageDetails";
import TrackView from "@/components/analytics/TrackView";
import { toPackage } from "@/lib/convex/map";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    package: string;
  }>;
}

export default async function PackagePage({ params }: PageProps) {
  const { package: packageId } = await params;
  const doc = await fetchQuery(api.packages.getBySlug, { slug: packageId });

  if (!doc) {
    notFound();
  }

  return (
    <>
      <TrackView packageSlug={packageId} />
      <PackageDetails package={toPackage(doc)} />
    </>
  );
}
