"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Button from "@/components/ui/Button";
import { setPackageBoostAction } from "@/app/admin/actions";

export type PopularityItem = {
  slug: string;
  name: string;
  boosted: boolean;
  boostedAt?: number;
  views: number;
  clicks: number;
  inquiries: number;
  score: number;
};

interface PopularPackagesWidgetProps {
  items: PopularityItem[];
}

export default function PopularPackagesWidget({
  items,
}: PopularPackagesWidgetProps) {
  const router = useRouter();
  const packages = useQuery(api.packages.list);
  const [boostingSlug, setBoostingSlug] = useState<string | null>(null);

  async function handleBoost(slug: string, currentlyBoosted: boolean) {
    const pkg = packages?.find((p) => p.slug === slug);
    if (!pkg) return;
    setBoostingSlug(slug);
    await setPackageBoostAction(pkg._id as Id<"packages">, !currentlyBoosted);
    setBoostingSlug(null);
    router.refresh();
  }

  const maxScore = Math.max(...items.map((i) => i.score), 1);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg text-ink-900">
            Package Popularity
          </h3>
          <p className="text-ink-500 text-sm">
            Ranked by views, clicks, and inquiries
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-ink-500 text-sm">
          No tracking data yet. Views and clicks will appear as visitors browse
          packages.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.slug}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-ink-100 hover:border-saffron-200 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center text-sm font-bold text-ink-600 shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink-900 truncate">
                      {item.name}
                    </p>
                    {item.boosted && (
                      <span className="px-2 py-0.5 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-ink-500 mt-1">
                    <span>{item.views} views</span>
                    <span>{item.clicks} clicks</span>
                    <span>{item.inquiries} inquiries</span>
                    <span className="text-saffron-600 font-semibold">
                      score {item.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-ink-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-saffron-500 to-marigold-500 rounded-full"
                      style={{
                        width: `${(item.score / maxScore) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <Button
                variant={item.boosted ? "primary" : "outline"}
                size="sm"
                className="shrink-0"
                disabled={boostingSlug === item.slug}
                onClick={() => handleBoost(item.slug, item.boosted)}
              >
                {boostingSlug === item.slug
                  ? "…"
                  : item.boosted
                    ? "Unboost"
                    : "Boost"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
