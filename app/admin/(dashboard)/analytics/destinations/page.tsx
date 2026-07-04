import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsPageShell from "@/components/admin/AnalyticsPageShell";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Destination Analytics - Admin" };

export default async function DestinationAnalyticsPage() {
  const sessionToken = await requireSessionToken();

  const [stats, destinationList] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.destinations.list),
  ]);

  const withPricing = destinationList.filter((d) => d.basePrice).length;
  const withLabels = destinationList.filter(
    (d) => d.labels && d.labels.length > 0,
  ).length;

  return (
    <AnalyticsPageShell
      title="Destination Analytics"
      description="Catalog overview and destination coverage across your site."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Destinations"
          value={stats.destinations}
          accent="ink"
        />
        <StatCard
          label="With Pricing"
          value={withPricing}
          accent="saffron"
          sublabel="Base price set"
        />
        <StatCard
          label="With Labels"
          value={withLabels}
          accent="emerald"
          sublabel="Categorized destinations"
        />
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg text-ink-900">
            All Destinations
          </h3>
          <Link
            href="/admin/destinations"
            className="text-saffron-600 hover:text-saffron-700 text-sm font-medium"
          >
            Manage destinations →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destinationList.map((dest) => (
            <div
              key={dest._id}
              className="flex gap-4 p-4 rounded-xl border border-ink-100"
            >
              {dest.image && (
                <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-medium text-ink-900 truncate">{dest.name}</p>
                <p className="text-ink-500 text-sm truncate">{dest.location}</p>
                <p className="text-ink-600 text-xs mt-1">
                  {dest.basePrice
                    ? `From ₹${dest.basePrice.toLocaleString()}`
                    : "No base price"}{" "}
                  · {dest.highlights.length} highlights
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsPageShell>
  );
}
