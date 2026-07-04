"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageManager from "./ImageManager";
import StringListEditor from "./StringListEditor";
import ItineraryEditor from "./ItineraryEditor";
import { EntityPanelShell, PanelSection } from "./AdminEntitySplitLayout";
import { slugify } from "@/lib/admin/slugify";
import {
  createPackageAction,
  updatePackageAction,
  type PackageFormData,
} from "@/app/admin/actions";

interface PackageFormProps {
  pkg?: Doc<"packages">;
  onSuccess: () => void;
  onCancel: () => void;
  variant?: "standalone" | "panel";
  footerExtra?: React.ReactNode;
}

const emptyForm: PackageFormData = {
  slug: "",
  name: "",
  description: "",
  image: "",
  destinations: [],
  destinationIds: [],
  duration: "",
  price: 0,
  highlights: [],
  itinerary: [],
  inclusions: [],
};

function toFormData(pkg: Doc<"packages">): PackageFormData {
  return {
    slug: pkg.slug,
    name: pkg.name,
    description: pkg.description,
    image: pkg.image,
    destinations: pkg.destinations,
    destinationIds: pkg.destinationIds,
    duration: pkg.duration,
    price: pkg.price,
    highlights: pkg.highlights,
    itinerary: pkg.itinerary,
    inclusions: pkg.inclusions ?? [],
  };
}

export default function PackageForm({
  pkg,
  onSuccess,
  onCancel,
  variant = "standalone",
  footerExtra,
}: PackageFormProps) {
  const destinationDocs = useQuery(api.destinations.list);
  const [form, setForm] = useState<PackageFormData>(() =>
    pkg ? toFormData(pkg) : emptyForm,
  );
  const [slugTouched, setSlugTouched] = useState(!!pkg);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof PackageFormData>(
    key: K,
    value: PackageFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDestination(slug: string, name: string) {
    const isSelected = form.destinationIds.includes(slug);
    if (isSelected) {
      updateField(
        "destinationIds",
        form.destinationIds.filter((id) => id !== slug),
      );
      updateField(
        "destinations",
        form.destinations.filter((n) => n !== name),
      );
    } else {
      updateField("destinationIds", [...form.destinationIds, slug]);
      updateField("destinations", [...form.destinations, name]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: PackageFormData = {
      ...form,
      price: Number(form.price),
      highlights: form.highlights.filter(Boolean),
      inclusions: form.inclusions?.filter(Boolean),
    };

    const result = pkg
      ? await updatePackageAction(pkg._id, payload)
      : await createPackageAction(payload);

    setIsSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    onSuccess();
  }

  const destinationPicker = destinationDocs && (
    <PanelSection title="Destinations">
      <div className="flex flex-wrap gap-2">
        {destinationDocs.map((dest) => (
          <button
            key={dest._id}
            type="button"
            onClick={() => toggleDestination(dest.slug, dest.name)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              form.destinationIds.includes(dest.slug)
                ? "bg-saffron-500 text-white"
                : "bg-white border border-ink-200 text-ink-600"
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>
    </PanelSection>
  );

  const fields = (
    <>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
          {error}
        </div>
      )}

      {variant === "panel" ? (
        <>
          <ImageManager
            mainImage={form.image}
            gallery={form.image ? [form.image] : []}
            onMainImageChange={(image) => updateField("image", image)}
            onGalleryChange={(urls) => {
              if (urls[0]) updateField("image", urls[0]);
            }}
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
              label="Price (INR)"
              type="number"
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              required
            />
            <Input
              label="Duration"
              value={form.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              required
            />
            <div className="p-3 rounded-xl bg-ink-50 flex flex-col justify-center">
              <p className="text-ink-500 text-xs">Itinerary</p>
              <p className="text-ink-900 font-medium text-sm mt-0.5">
                {form.itinerary.length} days
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
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
              label="Duration"
              value={form.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              required
            />
            <Input
              label="Price (INR)"
              type="number"
              value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              required
            />
          </div>

          <ImageManager
            mainImage={form.image}
            gallery={form.image ? [form.image] : []}
            onMainImageChange={(image) => updateField("image", image)}
            onGalleryChange={(urls) => {
              if (urls[0]) updateField("image", urls[0]);
            }}
          />
        </>
      )}

      <PanelSection title="Description">
        <Textarea
          label={variant === "panel" ? undefined : "Description"}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
          rows={3}
        />
      </PanelSection>

      {destinationPicker}

      <StringListEditor
        label="Highlights"
        items={form.highlights}
        onChange={(highlights) => updateField("highlights", highlights)}
      />

      <StringListEditor
        label="Inclusions"
        items={form.inclusions ?? []}
        onChange={(inclusions) => updateField("inclusions", inclusions)}
      />

      <ItineraryEditor
        itinerary={form.itinerary}
        onChange={(itinerary) => updateField("itinerary", itinerary)}
      />
    </>
  );

  if (variant === "panel") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-0">
        <EntityPanelShell
          scrollBody
          header={
            <>
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
                label="Duration"
                value={form.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                required
                className="mt-2"
              />
            </>
          }
          actions={
            <>
              <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                {isSubmitting ? "Saving…" : pkg ? "Save" : "Create"}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
            </>
          }
          footer={footerExtra}
        >
          {fields}
        </EntityPanelShell>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields}
      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : pkg ? "Update package" : "Create package"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
