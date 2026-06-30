import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSession } from "./lib/adminAuth";
import { destinationInput } from "./validators";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

async function assertUniqueSlug(
  ctx: MutationCtx,
  slug: string,
  excludeId?: Id<"destinations">,
) {
  const existing = await ctx.db
    .query("destinations")
    .withIndex("by_slug", (q) => q.eq("slug", slug))
    .unique();
  if (existing && existing._id !== excludeId) {
    throw new Error(`Destination slug "${slug}" already exists`);
  }
}

export const create = mutation({
  args: {
    sessionToken: v.string(),
    data: destinationInput,
  },
  handler: async (ctx, { sessionToken, data }) => {
    await assertAdminSession(ctx, sessionToken);
    await assertUniqueSlug(ctx, data.slug);
    return await ctx.db.insert("destinations", data);
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("destinations"),
    data: destinationInput,
  },
  handler: async (ctx, { sessionToken, id, data }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Destination not found");
    await assertUniqueSlug(ctx, data.slug, id);
    await ctx.db.replace(id, data);
    return id;
  },
});

export const remove = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("destinations"),
  },
  handler: async (ctx, { sessionToken, id }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Destination not found");
    await ctx.db.delete(id);
    return id;
  },
});
