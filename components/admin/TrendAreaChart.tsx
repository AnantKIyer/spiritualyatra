"use client";

interface TrendAreaChartProps {
  data: Array<{ date: string; count: number }>;
  title: string;
}

export default function TrendAreaChart({ data, title }: TrendAreaChartProps) {
  const width = 400;
  const height = 160;
  const padding = { top: 10, right: 10, bottom: 24, left: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - (d.count / maxCount) * chartH;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding.left} ${padding.top + chartH} L ${points[0]?.x ?? padding.left} ${padding.top + chartH} Z`;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-ink-900">{title}</h3>
          <p className="text-ink-500 text-sm">{total} inquiries in 30 days</p>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        aria-hidden
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle key={p.date} cx={p.x} cy={p.y} r="3" fill="#f97316" />
        ))}
      </svg>
      <div className="flex justify-between text-xs text-ink-400 mt-2">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}
