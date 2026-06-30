"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PackageCard from "@/components/sections/PackageCard";
import ConvexConfigNotice from "@/components/convex/ConvexConfigNotice";
import { isConvexConfigured } from "@/lib/convex/url";
import { toPackages } from "@/lib/convex/map";
import { sortPackagesBoostedFirst } from "@/lib/packages/sort";

export default function PackagesGrid() {
  const configured = isConvexConfigured();
  const packageDocs = useQuery(api.packages.list, configured ? {} : "skip");

  const packages = useMemo(() => {
    if (!packageDocs) return [];
    return sortPackagesBoostedFirst(toPackages(packageDocs));
  }, [packageDocs]);

  if (!configured) {
    return <ConvexConfigNotice />;
  }

  if (packageDocs === undefined) {
    return (
      <div className="py-16 text-center text-ink-500">Loading packages…</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
}
