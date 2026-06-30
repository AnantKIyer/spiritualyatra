import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSecret } from "./lib/adminAuth";
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
    adminSecret: v.string(),
    data: packageInput,
  },
  handler: async (ctx, { adminSecret, data }) => {
    assertAdminSecret(adminSecret);
    await assertUniqueSlug(ctx, data.slug);
    return await ctx.db.insert("packages", data);
  },
});

export const update = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("packages"),
    data: packageInput,
  },
  handler: async (ctx, { adminSecret, id, data }) => {
    assertAdminSecret(adminSecret);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await assertUniqueSlug(ctx, data.slug, id);
    await ctx.db.patch(id, data);
    return id;
  },
});

export const setBoost = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("packages"),
    boosted: v.boolean(),
  },
  handler: async (ctx, { adminSecret, id, boosted }) => {
    assertAdminSecret(adminSecret);
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
    adminSecret: v.string(),
    id: v.id("packages"),
  },
  handler: async (ctx, { adminSecret, id }) => {
    assertAdminSecret(adminSecret);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await ctx.db.delete(id);
    return id;
  },
});
