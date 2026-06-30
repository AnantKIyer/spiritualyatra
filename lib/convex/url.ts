export function getConvexUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_CONVEX_URL;
}

export function isConvexConfigured(): boolean {
  return Boolean(getConvexUrl());
}
