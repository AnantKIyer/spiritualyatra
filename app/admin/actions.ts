"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { getAdminSecret, requireAdminSession } from "@/lib/admin/auth";
import { createSessionToken, SESSION_COOKIE } from "@/lib/admin/session";

export type ActionResult = { success: true } | { success: false; error: string };

export type DestinationFormData = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  location: string;
  highlights: string[];
  labels?: Array<
    "spiritual" | "romantic" | "historic" | "excursion" | "adventure"
  >;
  basePrice?: number;
  duration?: string;
  bestTime?: string;
  experiences?: string[];
  tripPlan: Array<{
    day: string;
    title: string;
    description: string;
    activities: string[];
  }>;
};

export type PackageFormData = {
  slug: string;
  name: string;
  description: string;
  image: string;
  destinations: string[];
  destinationIds: string[];
  duration: string;
  price: number;
  highlights: string[];
  itinerary: Array<{
    day: string;
    title: string;
    location: string;
    description: string;
    activities: string[];
  }>;
  inclusions?: string[];
};

export type TestimonialFormData = {
  slug: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
  avatar?: string;
};

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const expectedUser = process.env.ADMIN_USERNAME ?? "admin-user";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "password";

  if (username !== expectedUser || password !== expectedPass) {
    return { success: false, error: "Invalid username or password" };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function getUploadUrlAction(): Promise<{ uploadUrl: string }> {
  await requireAdminSession();
  const uploadUrl = await fetchMutation(api.files.generateUploadUrl, {
    adminSecret: getAdminSecret(),
  });
  return { uploadUrl };
}

export async function resolveStorageUrlAction(
  storageId: string,
): Promise<{ url: string | null }> {
  await requireAdminSession();
  const url = await fetchQuery(api.files.getUrl, {
    storageId: storageId as import("@/convex/_generated/dataModel").Id<"_storage">,
  });
  return { url };
}

export async function createDestinationAction(
  data: DestinationFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminDestinations.create, {
      adminSecret: getAdminSecret(),
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create",
    };
  }
}

export async function updateDestinationAction(
  id: Id<"destinations">,
  data: DestinationFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminDestinations.update, {
      adminSecret: getAdminSecret(),
      id,
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update",
    };
  }
}

export async function deleteDestinationAction(
  id: Id<"destinations">,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminDestinations.remove, {
      adminSecret: getAdminSecret(),
      id,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete",
    };
  }
}

export async function createPackageAction(
  data: PackageFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminPackages.create, {
      adminSecret: getAdminSecret(),
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create",
    };
  }
}

export async function updatePackageAction(
  id: Id<"packages">,
  data: PackageFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminPackages.update, {
      adminSecret: getAdminSecret(),
      id,
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update",
    };
  }
}

export async function deletePackageAction(
  id: Id<"packages">,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminPackages.remove, {
      adminSecret: getAdminSecret(),
      id,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete",
    };
  }
}

export async function createTestimonialAction(
  data: TestimonialFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminTestimonials.create, {
      adminSecret: getAdminSecret(),
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create",
    };
  }
}

export async function updateTestimonialAction(
  id: Id<"testimonials">,
  data: TestimonialFormData,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminTestimonials.update, {
      adminSecret: getAdminSecret(),
      id,
      data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update",
    };
  }
}

export async function deleteTestimonialAction(
  id: Id<"testimonials">,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminTestimonials.remove, {
      adminSecret: getAdminSecret(),
      id,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete",
    };
  }
}

export async function updateInquiryStatusAction(
  id: Id<"contactInquiries">,
  status: "new" | "contacted" | "closed",
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.contactInquiries.updateStatus, {
      adminSecret: getAdminSecret(),
      id,
      status,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update",
    };
  }
}

export async function setPackageBoostAction(
  id: Id<"packages">,
  boosted: boolean,
): Promise<ActionResult> {
  await requireAdminSession();
  try {
    await fetchMutation(api.adminPackages.setBoost, {
      adminSecret: getAdminSecret(),
      id,
      boosted,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update boost",
    };
  }
}
