import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsPageShell from "@/components/admin/AnalyticsPageShell";
import PopularPackagesWidget from "@/components/admin/PopularPackagesWidget";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Package Analytics - Admin" };

export default async function PackageAnalyticsPage() {
  const sessionToken = await requireSessionToken();
  const [stats, popularity] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.analytics.packagePopularity, { sessionToken }),
  ]);

  return (
    <AnalyticsPageShell
      title="Package Analytics"
      description="Featured packages, popularity scores, and boost management."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Packages"
          value={stats.packages}
          accent="ink"
        />
        <StatCard
          label="Featured"
          value={stats.boostedCount}
          accent="emerald"
          sublabel="Boosted on homepage"
        />
        <StatCard
          label="Tracked Packages"
          value={popularity.filter((p) => p.score > 0).length}
          accent="saffron"
          sublabel="With views, clicks, or inquiries"
        />
      </div>

      <PopularPackagesWidget items={popularity} showViewAll={false} />
    </AnalyticsPageShell>
  );
}
