import { query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSecret } from "./lib/adminAuth";

export const getStats = query({
  args: { adminSecret: v.string() },
  handler: async (ctx, { adminSecret }) => {
    assertAdminSecret(adminSecret);

    const [packages, destinations, testimonials, inquiries, events] =
      await Promise.all([
        ctx.db.query("packages").collect(),
        ctx.db.query("destinations").collect(),
        ctx.db.query("testimonials").collect(),
        ctx.db.query("contactInquiries").collect(),
        ctx.db.query("packageEvents").collect(),
      ]);

    const inquiriesByStatus = {
      new: inquiries.filter((i) => i.status === "new").length,
      contacted: inquiries.filter((i) => i.status === "contacted").length,
      closed: inquiries.filter((i) => i.status === "closed").length,
    };

    const avgRating =
      testimonials.length > 0
        ? testimonials.reduce((sum, t) => sum + t.rating, 0) /
          testimonials.length
        : 0;

    const totalViews = events.filter((e) => e.type === "view").length;
    const totalClicks = events.filter((e) => e.type === "click").length;
    const boostedCount = packages.filter((p) => p.boosted).length;

    return {
      packages: packages.length,
      destinations: destinations.length,
      testimonials: testimonials.length,
      inquiries: inquiries.length,
      inquiriesByStatus,
      avgRating: Math.round(avgRating * 10) / 10,
      totalViews,
      totalClicks,
      boostedCount,
    };
  },
});

export const packagePopularity = query({
  args: { adminSecret: v.string() },
  handler: async (ctx, { adminSecret }) => {
    assertAdminSecret(adminSecret);

    const [packages, events, inquiries] = await Promise.all([
      ctx.db.query("packages").collect(),
      ctx.db.query("packageEvents").collect(),
      ctx.db.query("contactInquiries").collect(),
    ]);

    const viewCounts = new Map<string, number>();
    const clickCounts = new Map<string, number>();
    const inquiryCounts = new Map<string, number>();

    for (const event of events) {
      if (event.type === "view") {
        viewCounts.set(
          event.packageSlug,
          (viewCounts.get(event.packageSlug) ?? 0) + 1,
        );
      } else {
        clickCounts.set(
          event.packageSlug,
          (clickCounts.get(event.packageSlug) ?? 0) + 1,
        );
      }
    }

    for (const inquiry of inquiries) {
      if (inquiry.packageSlug) {
        inquiryCounts.set(
          inquiry.packageSlug,
          (inquiryCounts.get(inquiry.packageSlug) ?? 0) + 1,
        );
      }
    }

    const ranked = packages.map((pkg) => {
      const views = viewCounts.get(pkg.slug) ?? 0;
      const clicks = clickCounts.get(pkg.slug) ?? 0;
      const inquiryCount = inquiryCounts.get(pkg.slug) ?? 0;
      const score = views + clicks * 3 + inquiryCount * 5;

      return {
        slug: pkg.slug,
        name: pkg.name,
        boosted: pkg.boosted ?? false,
        boostedAt: pkg.boostedAt,
        views,
        clicks,
        inquiries: inquiryCount,
        score,
      };
    });

    ranked.sort((a, b) => b.score - a.score);
    return ranked;
  },
});

export const inquiriesOverTime = query({
  args: { adminSecret: v.string() },
  handler: async (ctx, { adminSecret }) => {
    assertAdminSecret(adminSecret);

    const inquiries = await ctx.db.query("contactInquiries").collect();
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    const buckets = new Map<string, number>();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const key = date.toISOString().slice(0, 10);
      buckets.set(key, 0);
    }

    for (const inquiry of inquiries) {
      if (inquiry._creationTime < thirtyDaysAgo) continue;
      const key = new Date(inquiry._creationTime).toISOString().slice(0, 10);
      if (buckets.has(key)) {
        buckets.set(key, (buckets.get(key) ?? 0) + 1);
      }
    }

    return Array.from(buckets.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  },
});
