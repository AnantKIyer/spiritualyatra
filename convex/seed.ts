import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { destinationInput, packageInput, testimonialInput } from "./validators";

export const replaceAll = mutation({
  args: {
    destinations: v.array(destinationInput),
    packages: v.array(packageInput),
    testimonials: v.array(testimonialInput),
    adminKey: v.string(),
  },
  handler: async (ctx, { destinations, packages, testimonials, adminKey }) => {
    const expectedKey = process.env.SEED_ADMIN_KEY ?? "spiritual-yatra-seed";
    if (adminKey !== expectedKey) {
      throw new Error("Invalid admin key");
    }

    for (const table of ["destinations", "packages", "testimonials"] as const) {
      const rows = await ctx.db.query(table).collect();
      for (const row of rows) {
        await ctx.db.delete(row._id);
      }
    }

    for (const destination of destinations) {
      await ctx.db.insert("destinations", destination);
    }
    for (const pkg of packages) {
      await ctx.db.insert("packages", pkg);
    }
    for (const testimonial of testimonials) {
      await ctx.db.insert("testimonials", testimonial);
    }

    return {
      destinations: destinations.length,
      packages: packages.length,
      testimonials: testimonials.length,
    };
  },
});
