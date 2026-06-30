"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface TrackViewProps {
  packageSlug: string;
}

export default function TrackView({ packageSlug }: TrackViewProps) {
  const track = useMutation(api.packageEvents.track);

  useEffect(() => {
    const key = `viewed-${packageSlug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void track({ type: "view", packageSlug });
  }, [packageSlug, track]);

  return null;
}
