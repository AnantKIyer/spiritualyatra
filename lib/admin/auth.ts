import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getSessionToken, SESSION_COOKIE } from "./session";

export { SESSION_COOKIE, getSessionToken };

export async function requireAdminSession(): Promise<void> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/admin/login");
  }

  const session = await fetchQuery(api.adminAuth.validateSession, {
    sessionToken: token,
  });

  if (!session) {
    redirect("/admin/login");
  }
}

export async function isAdminSessionValid(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;

  const session = await fetchQuery(api.adminAuth.validateSession, {
    sessionToken: token,
  });
  return Boolean(session);
}

export async function requireSessionToken(): Promise<string> {
  const token = await getSessionToken();
  if (!token) {
    throw new Error("Admin session is required");
  }
  return token;
}
