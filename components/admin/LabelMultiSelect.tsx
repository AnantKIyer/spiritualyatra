"use client";

import type { LocationLabel } from "@/types";
import { cn } from "@/lib/utils";

const ALL_LABELS: LocationLabel[] = [
  "spiritual",
  "romantic",
  "historic",
  "excursion",
  "adventure",
];

interface LabelMultiSelectProps {
  selected: LocationLabel[];
  onChange: (labels: LocationLabel[]) => void;
}

export default function LabelMultiSelect({
  selected,
  onChange,
}: LabelMultiSelectProps) {
  function toggle(label: LocationLabel) {
    if (selected.includes(label)) {
      onChange(selected.filter((item) => item !== label));
    } else {
      onChange([...selected, label]);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ink-900 mb-2">
        Labels
      </label>
      <div className="flex flex-wrap gap-2">
        {ALL_LABELS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => toggle(label)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors",
              selected.includes(label)
                ? "bg-saffron-500 text-white"
                : "bg-white border border-ink-200 text-ink-600 hover:border-saffron-300",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
