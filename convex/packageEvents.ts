import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const track = mutation({
  args: {
    type: v.union(v.literal("view"), v.literal("click")),
    packageSlug: v.string(),
  },
  handler: async (ctx, { type, packageSlug }) => {
    await ctx.db.insert("packageEvents", { type, packageSlug });
  },
});
