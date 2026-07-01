import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsPageShell from "@/components/admin/AnalyticsPageShell";
import TrendAreaChart from "@/components/admin/TrendAreaChart";
import DonutChart from "@/components/admin/DonutChart";
import StatCard from "@/components/admin/StatCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Inquiry Analytics - Admin" };

export default async function InquiryAnalyticsPage() {
  const sessionToken = await requireSessionToken();
  const [stats, trend, inquiries] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.analytics.inquiriesOverTime, { sessionToken }),
    fetchQuery(api.contactInquiries.list, { sessionToken }),
  ]);

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
    <AnalyticsPageShell
      title="Inquiry Analytics"
      description="Contact form submissions, status breakdown, and 30-day trends."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Inquiries"
          value={stats.inquiries}
          accent="royal"
        />
        <StatCard
          label="Awaiting Response"
          value={stats.inquiriesByStatus.new}
          accent="saffron"
          sublabel="New inquiries"
        />
        <StatCard
          label="Closed"
          value={stats.inquiriesByStatus.closed}
          accent="ink"
          sublabel={`${stats.inquiriesByStatus.contacted} contacted`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendAreaChart data={trend} title="Inquiry Trend (30 days)" />
        <DonutChart title="Inquiry Status" segments={statusSegments} />
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
        <h3 className="font-display text-lg text-ink-900 mb-4">
          All Inquiries ({inquiries.length})
        </h3>
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
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="border-b border-ink-50">
                  <td className="py-3 pr-4">
                    <p className="text-ink-900 font-medium">{inquiry.name}</p>
                    <p className="text-ink-500 text-xs">{inquiry.email}</p>
                  </td>
                  <td className="py-3 pr-4 text-ink-600">
                    {inquiry.packageSlug ?? "—"}
                  </td>
                  <td className="py-3 pr-4 capitalize text-ink-600">
                    {inquiry.status}
                  </td>
                  <td className="py-3 text-ink-500 whitespace-nowrap">
                    {new Date(inquiry._creationTime).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnalyticsPageShell>
  );
}
