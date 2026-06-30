import { query } from "./_generated/server";
import { v } from "convex/values";
import { locationLabel } from "./validators";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("destinations").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const listByLabel = query({
  args: { label: locationLabel },
  handler: async (ctx, { label }) => {
    const all = await ctx.db.query("destinations").collect();
    return all.filter((dest) => dest.labels?.includes(label));
  },
});

export const listSlugs = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("destinations").collect();
    return all.map((dest) => dest.slug);
  },
});
