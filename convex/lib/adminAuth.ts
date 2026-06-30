export function assertAdminSecret(adminSecret: string) {
  const expected =
    process.env.ADMIN_API_SECRET ?? "spiritual-yatra-admin-api-secret-dev";
  if (adminSecret !== expected) {
    throw new Error("Unauthorized");
  }
}
