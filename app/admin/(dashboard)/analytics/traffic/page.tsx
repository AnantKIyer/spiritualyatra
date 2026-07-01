import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsPageShell from "@/components/admin/AnalyticsPageShell";
import RankedBarList from "@/components/admin/RankedBarList";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Traffic Analytics - Admin" };

export default async function TrafficAnalyticsPage() {
  const sessionToken = await requireSessionToken();
  const [stats, popularity] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.analytics.packagePopularity, { sessionToken }),
  ]);

  const ctr =
    stats.totalViews > 0
      ? ((stats.totalClicks / stats.totalViews) * 100).toFixed(1)
      : "0";

  const viewRanking = popularity
    .filter((p) => p.views > 0)
    .slice(0, 8)
    .map((p) => ({
      label: p.name,
      value: p.views,
      sublabel: `${p.clicks} clicks`,
    }));

  const clickRanking = popularity
    .filter((p) => p.clicks > 0)
    .slice(0, 8)
    .map((p) => ({
      label: p.name,
      value: p.clicks,
      sublabel: `${p.views} views`,
    }));

  return (
    <AnalyticsPageShell
      title="Traffic Analytics"
      description="Package card views, clicks, and click-through performance."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Views"
          value={stats.totalViews}
          accent="saffron"
          sublabel="All-time package page views"
        />
        <StatCard
          label="Total Clicks"
          value={stats.totalClicks}
          accent="maroon"
          sublabel="All-time card clicks"
        />
        <StatCard
          label="Click-through Rate"
          value={`${ctr}%`}
          accent="royal"
          sublabel="Clicks ÷ views"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RankedBarList title="Top Packages by Views" items={viewRanking} />
        <div id="clicks">
          <RankedBarList title="Top Packages by Clicks" items={clickRanking} />
        </div>
      </div>
    </AnalyticsPageShell>
  );
}
