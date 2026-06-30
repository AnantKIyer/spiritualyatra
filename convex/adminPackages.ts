import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSession } from "./lib/adminAuth";
import { packageInput } from "./validators";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

async function assertUniqueSlug(
  ctx: MutationCtx,
  slug: string,
  excludeId?: Id<"packages">,
) {
  const existing = await ctx.db
    .query("packages")
    .withIndex("by_slug", (q) => q.eq("slug", slug))
    .unique();
  if (existing && existing._id !== excludeId) {
    throw new Error(`Package slug "${slug}" already exists`);
  }
}

export const create = mutation({
  args: {
    sessionToken: v.string(),
    data: packageInput,
  },
  handler: async (ctx, { sessionToken, data }) => {
    await assertAdminSession(ctx, sessionToken);
    await assertUniqueSlug(ctx, data.slug);
    return await ctx.db.insert("packages", data);
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("packages"),
    data: packageInput,
  },
  handler: async (ctx, { sessionToken, id, data }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await assertUniqueSlug(ctx, data.slug, id);
    await ctx.db.patch(id, data);
    return id;
  },
});

export const setBoost = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("packages"),
    boosted: v.boolean(),
  },
  handler: async (ctx, { sessionToken, id, boosted }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await ctx.db.patch(id, {
      boosted,
      boostedAt: boosted ? Date.now() : undefined,
    });
    return id;
  },
});

export const remove = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("packages"),
  },
  handler: async (ctx, { sessionToken, id }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await ctx.db.delete(id);
    return id;
  },
});
