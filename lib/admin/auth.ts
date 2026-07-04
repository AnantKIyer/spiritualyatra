import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { isConvexConfigured } from "@/lib/convex/url";
import { getSessionToken, SESSION_COOKIE } from "./session";

export { SESSION_COOKIE, getSessionToken };

export async function validateSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token || !isConvexConfigured()) {
    return false;
  }

  try {
    const session = await fetchQuery(api.adminAuth.validateSession, {
      sessionToken: token,
    });
    return Boolean(session);
  } catch {
    return false;
  }
}

export async function requireAdminSession(): Promise<void> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/admin/login");
  }

  const valid = await validateSessionToken(token);
  if (!valid) {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    redirect("/admin/login");
  }
}

export async function isAdminSessionValid(): Promise<boolean> {
  const token = await getSessionToken();
  return validateSessionToken(token);
}

export async function requireSessionToken(): Promise<string> {
  const token = await getSessionToken();
  if (!token) {
    throw new Error("Admin session is required");
  }
  return token;
}
