"use client";

import { useState } from "react";
import Image from "next/image";
import type { Doc } from "@/convex/_generated/dataModel";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageManager from "./ImageManager";
import StringListEditor from "./StringListEditor";
import LabelMultiSelect from "./LabelMultiSelect";
import TripPlanEditor from "./TripPlanEditor";
import { slugify } from "@/lib/admin/slugify";
import {
  createDestinationAction,
  updateDestinationAction,
  type DestinationFormData,
} from "@/app/admin/actions";
import type { LocationLabel } from "@/types";

interface DestinationFormProps {
  destination?: Doc<"destinations">;
  onSuccess: () => void;
  onCancel: () => void;
  layout?: "default" | "panel";
  onDelete?: () => void;
  isDeleting?: boolean;
}

const emptyForm: DestinationFormData = {
  slug: "",
  name: "",
  description: "",
  longDescription: "",
  image: "",
  gallery: [],
  location: "",
  highlights: [],
  labels: [],
  basePrice: undefined,
  duration: "",
  bestTime: "",
  experiences: [],
  tripPlan: [],
};

function toFormData(destination: Doc<"destinations">): DestinationFormData {
  return {
    slug: destination.slug,
    name: destination.name,
    description: destination.description,
    longDescription: destination.longDescription,
    image: destination.image,
    gallery: destination.gallery,
    location: destination.location,
    highlights: destination.highlights,
    labels: destination.labels ?? [],
    basePrice: destination.basePrice,
    duration: destination.duration ?? "",
    bestTime: destination.bestTime ?? "",
    experiences: destination.experiences ?? [],
    tripPlan: destination.tripPlan,
  };
}

export default function DestinationForm({
  destination,
  onSuccess,
  onCancel,
  layout = "default",
  onDelete,
  isDeleting = false,
}: DestinationFormProps) {
  const [form, setForm] = useState<DestinationFormData>(() =>
    destination ? toFormData(destination) : emptyForm,
  );
  const [slugTouched, setSlugTouched] = useState(!!destination);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof DestinationFormData>(
    key: K,
    value: DestinationFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: DestinationFormData = {
      ...form,
      basePrice: form.basePrice ? Number(form.basePrice) : undefined,
      duration: form.duration || undefined,
      bestTime: form.bestTime || undefined,
      experiences: form.experiences?.filter(Boolean),
      highlights: form.highlights.filter(Boolean),
      labels: form.labels?.length ? form.labels : undefined,
    };

    const result = destination
      ? await updateDestinationAction(destination._id, payload)
      : await createDestinationAction(payload);

    setIsSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    onSuccess();
  }

  if (layout === "panel") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full min-h-0"
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-ink-100 shrink-0">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                updateField("name", name);
                if (!slugTouched) updateField("slug", slugify(name));
              }}
              required
            />
            <Input
              label="Location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 shrink-0 pt-6">
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : destination ? "Save" : "Create"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>

        <div className="p-5 flex-1 min-h-0 overflow-y-auto space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
              {error}
            </div>
          )}

          <ImageManager
            mainImage={form.image}
            gallery={form.gallery}
            onMainImageChange={(image) => updateField("image", image)}
            onGalleryChange={(gallery) => updateField("gallery", gallery)}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                updateField("slug", slugify(e.target.value));
              }}
              required
            />
            <Input
              label="Base price (INR)"
              type="number"
              value={form.basePrice ?? ""}
              onChange={(e) =>
                updateField(
                  "basePrice",
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            />
            <Input
              label="Duration"
              value={form.duration ?? ""}
              onChange={(e) => updateField("duration", e.target.value)}
            />
            <Input
              label="Best time"
              value={form.bestTime ?? ""}
              onChange={(e) => updateField("bestTime", e.target.value)}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">
              Description
            </h4>
            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
              rows={2}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">
              Long description
            </h4>
            <Textarea
              value={form.longDescription}
              onChange={(e) => updateField("longDescription", e.target.value)}
              required
              rows={3}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">Labels</h4>
            <LabelMultiSelect
              selected={(form.labels ?? []) as LocationLabel[]}
              onChange={(labels) => updateField("labels", labels)}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">
              Highlights
            </h4>
            <StringListEditor
              label=""
              items={form.highlights}
              onChange={(highlights) => updateField("highlights", highlights)}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">
              Trip plan
            </h4>
            <TripPlanEditor
              tripPlan={form.tripPlan}
              onChange={(tripPlan) => updateField("tripPlan", tripPlan)}
            />
          </div>
        </div>

        {destination && onDelete && (
          <div className="p-5 border-t border-ink-100 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {isDeleting ? "Deleting…" : "Delete destination"}
            </Button>
          </div>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => {
            const name = e.target.value;
            updateField("name", name);
            if (!slugTouched) updateField("slug", slugify(name));
          }}
          required
        />
        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            updateField("slug", slugify(e.target.value));
          }}
          required
        />
        <Input
          label="Location"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          required
        />
        <Input
          label="Base price (INR)"
          type="number"
          value={form.basePrice ?? ""}
          onChange={(e) =>
            updateField(
              "basePrice",
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
        />
        <Input
          label="Duration"
          value={form.duration ?? ""}
          onChange={(e) => updateField("duration", e.target.value)}
        />
        <Input
          label="Best time to visit"
          value={form.bestTime ?? ""}
          onChange={(e) => updateField("bestTime", e.target.value)}
        />
      </div>

      <Textarea
        label="Short description"
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        required
        rows={3}
      />
      <Textarea
        label="Long description"
        value={form.longDescription}
        onChange={(e) => updateField("longDescription", e.target.value)}
        required
        rows={6}
      />

      <LabelMultiSelect
        selected={(form.labels ?? []) as LocationLabel[]}
        onChange={(labels) => updateField("labels", labels)}
      />

      <StringListEditor
        label="Highlights"
        items={form.highlights}
        onChange={(highlights) => updateField("highlights", highlights)}
      />
      <StringListEditor
        label="Experiences"
        items={form.experiences ?? []}
        onChange={(experiences) => updateField("experiences", experiences)}
      />

      <ImageManager
        mainImage={form.image}
        gallery={form.gallery}
        onMainImageChange={(image) => updateField("image", image)}
        onGalleryChange={(gallery) => updateField("gallery", gallery)}
      />

      <TripPlanEditor
        tripPlan={form.tripPlan}
        onChange={(tripPlan) => updateField("tripPlan", tripPlan)}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving…"
            : destination
              ? "Update destination"
              : "Create destination"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
