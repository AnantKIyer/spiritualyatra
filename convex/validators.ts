import { v } from "convex/values";

export const locationLabel = v.union(
  v.literal("spiritual"),
  v.literal("romantic"),
  v.literal("historic"),
  v.literal("excursion"),
  v.literal("adventure"),
);

export const tripPlanDay = v.object({
  day: v.string(),
  title: v.string(),
  description: v.string(),
  activities: v.array(v.string()),
});

export const packageItineraryDay = v.object({
  day: v.string(),
  title: v.string(),
  location: v.string(),
  description: v.string(),
  activities: v.array(v.string()),
});

export const destinationInput = v.object({
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
});

export const packageInput = v.object({
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
});

export const testimonialInput = v.object({
  slug: v.string(),
  name: v.string(),
  location: v.string(),
  content: v.string(),
  rating: v.number(),
  image: v.optional(v.string()),
  avatar: v.optional(v.string()),
});
