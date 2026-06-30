"use client";

import { useState } from "react";
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
