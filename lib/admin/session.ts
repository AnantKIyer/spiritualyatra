export const SESSION_COOKIE = "admin_session";

export async function getSessionToken(): Promise<string | undefined> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}
