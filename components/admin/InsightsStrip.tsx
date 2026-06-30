interface InsightsStripProps {
  insights: string[];
}

export default function InsightsStrip({ insights }: InsightsStripProps) {
  if (insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-saffron-50 via-white to-marigold-50 rounded-2xl border border-saffron-200 p-5 md:p-6">
      <p className="text-saffron-700 text-xs font-semibold uppercase tracking-widest mb-3">
        Insights
      </p>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-ink-700 text-sm">
            <span className="text-saffron-500 mt-0.5 shrink-0">●</span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}
