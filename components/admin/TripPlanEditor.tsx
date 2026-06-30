"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StringListEditor from "./StringListEditor";
import type { TripPlanDay } from "@/types";

interface TripPlanEditorProps {
  tripPlan: TripPlanDay[];
  onChange: (tripPlan: TripPlanDay[]) => void;
}

export default function TripPlanEditor({
  tripPlan,
  onChange,
}: TripPlanEditorProps) {
  function updateDay(index: number, patch: Partial<TripPlanDay>) {
    const next = [...tripPlan];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function removeDay(index: number) {
    onChange(tripPlan.filter((_, i) => i !== index));
  }

  function addDay() {
    onChange([
      ...tripPlan,
      {
        day: `Day ${tripPlan.length + 1}`,
        title: "",
        description: "",
        activities: [],
      },
    ]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-ink-900">
          Trip plan
        </label>
        <Button type="button" variant="outline" size="sm" onClick={addDay}>
          Add day
        </Button>
      </div>
      {tripPlan.map((day, index) => (
        <div
          key={index}
          className="border border-ink-200 rounded-xl p-4 space-y-3 bg-white"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-ink-900">Day {index + 1}</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeDay(index)}
            >
              Remove
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Day label"
              value={day.day}
              onChange={(e) => updateDay(index, { day: e.target.value })}
            />
            <Input
              label="Title"
              value={day.title}
              onChange={(e) => updateDay(index, { title: e.target.value })}
            />
          </div>
          <Textarea
            label="Description"
            value={day.description}
            onChange={(e) =>
              updateDay(index, { description: e.target.value })
            }
          />
          <StringListEditor
            label="Activities"
            items={day.activities}
            onChange={(activities) => updateDay(index, { activities })}
            placeholder="Activity"
          />
        </div>
      ))}
    </div>
  );
}
