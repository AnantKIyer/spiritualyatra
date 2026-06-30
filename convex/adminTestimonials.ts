import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSecret } from "./lib/adminAuth";
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
    adminSecret: v.string(),
    data: testimonialInput,
  },
  handler: async (ctx, { adminSecret, data }) => {
    assertAdminSecret(adminSecret);
    await assertUniqueSlug(ctx, data.slug);
    return await ctx.db.insert("testimonials", data);
  },
});

export const update = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("testimonials"),
    data: testimonialInput,
  },
  handler: async (ctx, { adminSecret, id, data }) => {
    assertAdminSecret(adminSecret);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Testimonial not found");
    await assertUniqueSlug(ctx, data.slug, id);
    await ctx.db.replace(id, data);
    return id;
  },
});

export const remove = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("testimonials"),
  },
  handler: async (ctx, { adminSecret, id }) => {
    assertAdminSecret(adminSecret);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Testimonial not found");
    await ctx.db.delete(id);
    return id;
  },
});
