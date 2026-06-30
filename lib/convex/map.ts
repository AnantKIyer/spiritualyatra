import type { Doc } from "@/convex/_generated/dataModel";
import type { Destination, Package, Testimonial } from "@/types";

function withSlugAsId<T extends { slug: string; _id: unknown; _creationTime: unknown }>(
  doc: T,
): Omit<T, "slug" | "_id" | "_creationTime"> & { id: string } {
  const { slug, _id: _unusedId, _creationTime: _unusedTime, ...rest } = doc;
  void _unusedId;
  void _unusedTime;
  return { id: slug, ...rest };
}

export function toDestination(doc: Doc<"destinations">): Destination {
  return withSlugAsId(doc);
}

export function toPackage(doc: Doc<"packages">): Package {
  return withSlugAsId(doc);
}

export function toTestimonial(doc: Doc<"testimonials">): Testimonial {
  return withSlugAsId(doc);
}

export function toDestinations(docs: Doc<"destinations">[]): Destination[] {
  return docs.map(toDestination);
}

export function toPackages(docs: Doc<"packages">[]): Package[] {
  return docs.map(toPackage);
}

export function toTestimonials(docs: Doc<"testimonials">[]): Testimonial[] {
  return docs.map(toTestimonial);
}
