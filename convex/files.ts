import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdminSession } from "./lib/adminAuth";

export const generateUploadUrl = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, { sessionToken }) => {
    await assertAdminSession(ctx, sessionToken);
    return await ctx.storage.generateUploadUrl();
  },
});

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});
