export default function ConvexConfigNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 text-center text-amber-950">
      <p className="font-semibold">Content is temporarily unavailable</p>
      <p className="mt-2 text-sm text-amber-900/80">
        Set <code className="font-mono">NEXT_PUBLIC_CONVEX_URL</code> in your
        deployment environment and redeploy.
      </p>
    </div>
  );
}
