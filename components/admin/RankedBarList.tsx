interface RankedBarListProps {
  title: string;
  items: Array<{ label: string; value: number; sublabel?: string }>;
}

export default function RankedBarList({
  title,
  items,
}: RankedBarListProps) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <h3 className="font-display text-lg text-ink-900 mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-ink-500 text-sm">No data yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-ink-700 font-medium truncate pr-2">
                  {index + 1}. {item.label}
                </span>
                <span className="text-sm font-semibold text-ink-900 shrink-0">
                  {item.value}
                </span>
              </div>
              <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-saffron-500 to-marigold-500 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
              {item.sublabel && (
                <p className="text-xs text-ink-400 mt-0.5">{item.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
