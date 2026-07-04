import Link from "next/link";

interface AnalyticsPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AnalyticsPageShell({
  title,
  description,
  children,
}: AnalyticsPageShellProps) {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm font-medium text-saffron-600 hover:text-saffron-700 mb-4"
        >
          ← Back to dashboard
        </Link>
        <h2 className="font-display text-3xl text-ink-900 mb-1">{title}</h2>
        <p className="text-ink-600">{description}</p>
      </div>
      {children}
    </div>
  );
}
