"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { getConvexUrl } from "@/lib/convex/url";

let client: ConvexReactClient | null = null;

function getClient() {
  const url = getConvexUrl();
  if (!url) return null;
  if (!client) {
    client = new ConvexReactClient(url);
  }
  return client;
}

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const convexClient = getClient();

  if (!convexClient) {
    return children;
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
