"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface StringListEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function StringListEditor({
  label,
  items,
  onChange,
  placeholder = "Add item",
}: StringListEditorProps) {
  function updateItem(index: number, value: string) {
    const next = [...items];
    next[index] = value;
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-ink-900">{label}</label>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          Add
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-ink-500">No items yet.</p>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(index)}
            className="shrink-0"
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
