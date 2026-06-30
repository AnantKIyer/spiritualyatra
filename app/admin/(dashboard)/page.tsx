import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAdminSecret } from "@/lib/admin/auth";
import StatCard from "@/components/admin/StatCard";
import TrendAreaChart from "@/components/admin/TrendAreaChart";
import DonutChart from "@/components/admin/DonutChart";
import InsightsStrip from "@/components/admin/InsightsStrip";
import PopularPackagesWidget from "@/components/admin/PopularPackagesWidget";

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
  const adminSecret = getAdminSecret();

  const [stats, popularity, trend, inquiries] = await Promise.all([
    fetchQuery(api.analytics.getStats, { adminSecret }),
    fetchQuery(api.analytics.packagePopularity, { adminSecret }),
    fetchQuery(api.analytics.inquiriesOverTime, { adminSecret }),
    fetchQuery(api.contactInquiries.list, { adminSecret }),
  ]);

  const insights = buildInsights(popularity, stats);

  const statusSegments = [
    {
      label: "new",
      value: stats.inquiriesByStatus.new,
      color: "#f97316",
    },
    {
      label: "contacted",
      value: stats.inquiriesByStatus.contacted,
      color: "#059669",
    },
    {
      label: "closed",
      value: stats.inquiriesByStatus.closed,
      color: "#6b7280",
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
          interest.
        </p>
      </div>

      <InsightsStrip insights={insights} />

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard
          label="Package Views"
          value={stats.totalViews}
          accent="saffron"
          sublabel="Last 30 days (all time)"
        />
        <StatCard
          label="Card Clicks"
          value={stats.totalClicks}
          accent="maroon"
        />
        <StatCard
          label="Inquiries"
          value={stats.inquiries}
          accent="royal"
          sublabel={`${stats.inquiriesByStatus.new} new`}
        />
        <StatCard
          label="Featured"
          value={stats.boostedCount}
          accent="emerald"
          sublabel="Boosted packages"
        />
        <StatCard
          label="Destinations"
          value={stats.destinations}
          accent="ink"
        />
        <StatCard
          label="Avg Rating"
          value={stats.avgRating || "—"}
          accent="saffron"
          sublabel={`${stats.testimonials} reviews`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendAreaChart data={trend} title="Inquiry Trend" />
        <DonutChart title="Inquiry Status" segments={statusSegments} />
      </div>

      <PopularPackagesWidget items={popularity} />

      <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-ink-900">
            Recent Inquiries
          </h3>
          <Link
            href="/admin/inquiries"
            className="text-saffron-600 hover:text-saffron-700 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
        {inquiries.length === 0 ? (
          <p className="text-ink-500 text-sm">No inquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-ink-500">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Package</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 8).map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-ink-50">
                    <td className="py-3 pr-4">
                      <p className="text-ink-900 font-medium">{inquiry.name}</p>
                      <p className="text-ink-500 text-xs">{inquiry.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-ink-600">
                      {inquiry.packageSlug ?? "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-saffron-100 text-saffron-800 capitalize">
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-3 text-ink-500 whitespace-nowrap">
                      {new Date(inquiry._creationTime).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
