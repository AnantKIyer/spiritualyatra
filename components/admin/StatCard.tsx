interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: "saffron" | "maroon" | "emerald" | "royal" | "ink" | "gold";
  trend?: string;
}

const accents = {
  saffron: "from-saffron-500 to-marigold-500",
  maroon: "from-maroon-500 to-maroon-700",
  emerald: "from-emerald-500 to-emerald-700",
  royal: "from-royal-blue-500 to-royal-blue-700",
  ink: "from-ink-700 to-ink-900",
  gold: "from-marigold-500 to-gold-500",
};

export default function StatCard({
  label,
  value,
  sublabel,
  accent = "saffron",
  trend,
}: StatCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-ink-100 p-5 shadow-sm overflow-hidden group hover:shadow-indian-lg transition-shadow">
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${accents[accent]} opacity-10 rounded-bl-full`}
      />
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accents[accent]} mb-4`}
      />
      <p className="text-3xl font-display text-ink-900">{value}</p>
      <p className="text-ink-600 text-sm mt-1">{label}</p>
      {sublabel && (
        <p className="text-ink-400 text-xs mt-1">{sublabel}</p>
      )}
      {trend && (
        <p className="text-emerald-600 text-xs font-medium mt-2">{trend}</p>
      )}
    </div>
  );
}
