import type { Package } from "@/types";

type PackageDoc = Package & { boosted?: boolean; boostedAt?: number };

export function sortPackagesBoostedFirst<T extends PackageDoc>(packages: T[]): T[] {
  return [...packages].sort((a, b) => {
    const aBoosted = a.boosted ? 1 : 0;
    const bBoosted = b.boosted ? 1 : 0;
    if (aBoosted !== bBoosted) return bBoosted - aBoosted;
    if (a.boosted && b.boosted) {
      return (b.boostedAt ?? 0) - (a.boostedAt ?? 0);
    }
    return 0;
  });
}

export function selectFeaturedPackages<T extends PackageDoc>(
  packages: T[],
  count = 3,
): T[] {
  return sortPackagesBoostedFirst(packages).slice(0, count);
}
