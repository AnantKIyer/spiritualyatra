import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import AnalyticsPageShell from "@/components/admin/AnalyticsPageShell";
import StatCard from "@/components/admin/StatCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Ratings Analytics - Admin" };

export default async function RatingsAnalyticsPage() {
  const sessionToken = await requireSessionToken();

  const [stats, testimonials] = await Promise.all([
    fetchQuery(api.analytics.getStats, { sessionToken }),
    fetchQuery(api.testimonials.list),
  ]);

  const fiveStar = testimonials.filter((t) => t.rating === 5).length;
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: testimonials.filter((t) => t.rating === rating).length,
  }));
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <AnalyticsPageShell
      title="Ratings & Reviews"
      description="Testimonial performance and traveler satisfaction scores."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Average Rating"
          value={stats.avgRating || "—"}
          accent="gold"
          sublabel="Out of 5 stars"
        />
        <StatCard
          label="Total Reviews"
          value={stats.testimonials}
          accent="saffron"
        />
        <StatCard
          label="5-Star Reviews"
          value={fiveStar}
          accent="emerald"
          sublabel={
            stats.testimonials > 0
              ? `${Math.round((fiveStar / stats.testimonials) * 100)}% of total`
              : undefined
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
          <h3 className="font-display text-lg text-ink-900 mb-4">
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {distribution.map(({ rating, count }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-ink-600 w-8">{rating}★</span>
                <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saffron-500 to-marigold-500 rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-ink-500 w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-ink-900">
              Recent Testimonials
            </h3>
            <Link
              href="/admin/testimonials"
              className="text-saffron-600 hover:text-saffron-700 text-sm font-medium"
            >
              Manage →
            </Link>
          </div>
          <ul className="space-y-3">
            {testimonials.slice(0, 6).map((t) => (
              <li
                key={t._id}
                className="p-3 rounded-xl border border-ink-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-ink-900 text-sm">{t.name}</p>
                  <span className="text-marigold-600 text-sm font-semibold">
                    {t.rating}★
                  </span>
                </div>
                <p className="text-ink-500 text-xs mt-1">{t.location}</p>
                <p className="text-ink-600 text-sm mt-2 line-clamp-2">
                  {t.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnalyticsPageShell>
  );
}
