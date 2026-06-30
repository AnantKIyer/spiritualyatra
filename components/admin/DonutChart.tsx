interface DonutChartProps {
  title: string;
  segments: Array<{ label: string; value: number; color: string }>;
}

export default function DonutChart({ title, segments }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 54;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.reduce<
    Array<{
      label: string;
      value: number;
      color: string;
      dash: number;
      gap: number;
      offset: number;
    }>
  >((acc, seg) => {
    const fraction = total > 0 ? seg.value / total : 0;
    const dash = fraction * circumference;
    const prevOffset = acc.reduce((sum, a) => sum + a.dash, 0);
    acc.push({
      ...seg,
      dash,
      gap: circumference - dash,
      offset: -prevOffset,
    });
    return acc;
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <h3 className="font-display text-lg text-ink-900 mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={stroke}
            />
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={stroke}
                strokeDasharray={`${arc.dash} ${arc.gap}`}
                strokeDashoffset={arc.offset}
                transform="rotate(-90 70 70)"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display text-ink-900">{total}</span>
            <span className="text-xs text-ink-500">total</span>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-sm text-ink-600 capitalize">
                  {seg.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-ink-900">
                {seg.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
