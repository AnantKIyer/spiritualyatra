import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsBento from "@/components/admin/AnalyticsBento";
import InsightsStrip from "@/components/admin/InsightsStrip";
import PopularPackagesWidget from "@/components/admin/PopularPackagesWidget";
import RecentInquiriesWidget from "@/components/admin/RecentInquiriesWidget";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard - Spiritual Yatra",
};

type PopularityRow = {
  slug: string;
  name: string;
  boosted: boolean;
  views: number;
  clicks: number;
  inquiries: number;
  score: number;
};

type StatsRow = {
  inquiriesByStatus: { new: number; contacted: number; closed: number };
  totalViews: number;
  totalClicks: number;
};

function buildInsights(popularity: PopularityRow[], stats: StatsRow) {
  const insights: string[] = [];

  if (popularity.length > 0) {
    const top = popularity[0];
    insights.push(
      `"${top.name}" is your top-performing package with a popularity score of ${top.score} (${top.views} views, ${top.clicks} clicks, ${top.inquiries} inquiries).`,
    );

    const rising = popularity.find((p) => !p.boosted && p.score > 0);
    if (rising) {
      insights.push(
        `Consider boosting "${rising.name}" — it's gaining traction but isn't featured on the homepage yet.`,
      );
    }

    const topInquiry = [...popularity].sort(
      (a, b) => b.inquiries - a.inquiries,
    )[0];
    if (topInquiry && topInquiry.inquiries > 0) {
      insights.push(
        `"${topInquiry.name}" has the most contact inquiries (${topInquiry.inquiries}), indicating strong booking intent.`,
      );
    }
  }

  if (stats.inquiriesByStatus.new > 0) {
    insights.push(
      `You have ${stats.inquiriesByStatus.new} new ${stats.inquiriesByStatus.new === 1 ? "inquiry" : "inquiries"} awaiting response.`,
    );
  }

  if (stats.totalViews > 0 && stats.totalClicks > 0) {
    const ctr = ((stats.totalClicks / stats.totalViews) * 100).toFixed(1);
    insights.push(
      `Overall click-through rate is ${ctr}% (${stats.totalClicks} clicks from ${stats.totalViews} package views).`,
    );
  }

  return insights.slice(0, 4);
}

export default async function AdminDashboardPage() {
  const sessionToken = await requireSessionToken();

  const [stats, popularity, inquiries] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.analytics.packagePopularity, { sessionToken }),
    fetchQuery(api.contactInquiries.list, { sessionToken }),
  ]);

  const insights = buildInsights(popularity, stats);

  const bentoItems = [
    {
      label: "Package Views",
      value: stats.totalViews,
      sublabel: "All-time card impressions",
      href: "/admin/analytics/traffic",
      accent: "saffron" as const,
      colSpan: 2 as const,
      rowSpan: 2 as const,
    },
    {
      label: "Card Clicks",
      value: stats.totalClicks,
      sublabel: "All-time click events",
      href: "/admin/analytics/traffic#clicks",
      accent: "maroon" as const,
    },
    {
      label: "Inquiries",
      value: stats.inquiries,
      sublabel: `${stats.inquiriesByStatus.new} new`,
      href: "/admin/analytics/inquiries",
      accent: "royal" as const,
    },
    {
      label: "Featured",
      value: stats.boostedCount,
      sublabel: "Boosted packages",
      href: "/admin/analytics/packages",
      accent: "emerald" as const,
    },
    {
      label: "Destinations",
      value: stats.destinations,
      sublabel: "In catalog",
      href: "/admin/analytics/destinations",
      accent: "ink" as const,
    },
    {
      label: "Avg Rating",
      value: stats.avgRating || "—",
      sublabel: `${stats.testimonials} reviews`,
      href: "/admin/analytics/ratings",
      accent: "gold" as const,
      colSpan: 2 as const,
      rowSpan: 1 as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl text-ink-900 mb-1">
          Analytics Overview
        </h2>
        <p className="text-ink-600">
          Real-time insights across packages, destinations, and traveler
          interest. Click any metric for deeper analytics.
        </p>
      </div>

      <InsightsStrip insights={insights} />

      <AnalyticsBento items={bentoItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularPackagesWidget items={popularity} />
        <RecentInquiriesWidget inquiries={inquiries} />
      </div>
    </div>
  );
}
