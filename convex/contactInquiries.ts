import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSession } from "./lib/adminAuth";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    packageSlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactInquiries", {
      ...args,
      status: "new",
    });
  },
});

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, { sessionToken }) => {
    await assertAdminSession(ctx, sessionToken);
    return await ctx.db.query("contactInquiries").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("contactInquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("closed"),
    ),
  },
  handler: async (ctx, { sessionToken, id, status }) => {
    await assertAdminSession(ctx, sessionToken);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Inquiry not found");
    await ctx.db.patch(id, { status });
    return id;
  },
});
