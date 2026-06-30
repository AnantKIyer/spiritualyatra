import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSession } from "./lib/adminAuth";
import { testimonialInput } from "./validators";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

async function assertUniqueSlug(
  ctx: MutationCtx,
  slug: string,
  excludeId?: Id<"testimonials">,
) {
  const existing = await ctx.db
    .query("testimonials")
    .withIndex("by_slug", (q) => q.eq("slug", slug))
    .unique();
  if (existing && existing._id !== excludeId) {
    throw new Error(`Testimonial slug "${slug}" already exists`);
  }
}

export const create = mutation({
  args: {
    sessionToken: v.string(),
    data: testimonialInput,
  },
  handler: async (ctx, { sessionToken, data }) => {
    await assertAdminSession(ctx, sessionToken);
    await assertUniqueSlug(ctx, data.slug);
    return await ctx.db.insert("testimonials", data);
  },
});

export const update = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("testimonials"),
    data: testimonialInput,
  },
  handler: async (ctx, { sessionToken, id, data }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Testimonial not found");
    await assertUniqueSlug(ctx, data.slug, id);
    await ctx.db.replace(id, data);
    return id;
  },
});

export const remove = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("testimonials"),
  },
  handler: async (ctx, { sessionToken, id }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Testimonial not found");
    await ctx.db.delete(id);
    return id;
  },
});
