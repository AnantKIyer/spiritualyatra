import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("packages").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("packages")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const listSlugs = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("packages").collect();
    return all.map((pkg) => pkg.slug);
  },
});
