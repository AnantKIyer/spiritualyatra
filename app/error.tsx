"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-3xl text-ink-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-ink-600 mb-6">
          The page could not be loaded. If this is a new deployment, confirm
          that{" "}
          <code className="font-mono text-sm">NEXT_PUBLIC_CONVEX_URL</code> and
          other environment variables are set in Vercel, then redeploy.
        </p>
        {error.digest ? (
          <p className="text-xs text-ink-400 mb-6">Error ID: {error.digest}</p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-saffron-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-saffron-600"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
