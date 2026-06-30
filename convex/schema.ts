import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const locationLabel = v.union(
  v.literal("spiritual"),
  v.literal("romantic"),
  v.literal("historic"),
  v.literal("excursion"),
  v.literal("adventure"),
);

const tripPlanDay = v.object({
  day: v.string(),
  title: v.string(),
  description: v.string(),
  activities: v.array(v.string()),
});

const packageItineraryDay = v.object({
  day: v.string(),
  title: v.string(),
  location: v.string(),
  description: v.string(),
  activities: v.array(v.string()),
});

export default defineSchema({
  destinations: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    longDescription: v.string(),
    image: v.string(),
    gallery: v.array(v.string()),
    location: v.string(),
    highlights: v.array(v.string()),
    labels: v.optional(v.array(locationLabel)),
    basePrice: v.optional(v.number()),
    duration: v.optional(v.string()),
    bestTime: v.optional(v.string()),
    experiences: v.optional(v.array(v.string())),
    tripPlan: v.array(tripPlanDay),
  }).index("by_slug", ["slug"]),

  packages: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    destinations: v.array(v.string()),
    destinationIds: v.array(v.string()),
    duration: v.string(),
    price: v.number(),
    highlights: v.array(v.string()),
    itinerary: v.array(packageItineraryDay),
    inclusions: v.optional(v.array(v.string())),
    boosted: v.optional(v.boolean()),
    boostedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  testimonials: defineTable({
    slug: v.string(),
    name: v.string(),
    location: v.string(),
    content: v.string(),
    rating: v.number(),
    image: v.optional(v.string()),
    avatar: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  contactInquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    packageSlug: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("closed"),
    ),
  }).index("by_status", ["status"]),

  packageEvents: defineTable({
    type: v.union(v.literal("view"), v.literal("click")),
    packageSlug: v.string(),
  })
    .index("by_package", ["packageSlug"])
    .index("by_type", ["type"]),

  adminUsers: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    displayName: v.optional(v.string()),
    role: v.literal("admin"),
    active: v.boolean(),
  }).index("by_username", ["username"]),

  adminSessions: defineTable({
    token: v.string(),
    userId: v.id("adminUsers"),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
