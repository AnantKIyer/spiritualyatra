"use client";

import { useState } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageManager from "./ImageManager";
import { slugify } from "@/lib/admin/slugify";
import {
  createTestimonialAction,
  updateTestimonialAction,
  type TestimonialFormData,
} from "@/app/admin/actions";

interface TestimonialFormProps {
  testimonial?: Doc<"testimonials">;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm: TestimonialFormData = {
  slug: "",
  name: "",
  location: "",
  content: "",
  rating: 5,
  avatar: "",
  image: "",
};

function toFormData(testimonial: Doc<"testimonials">): TestimonialFormData {
  return {
    slug: testimonial.slug,
    name: testimonial.name,
    location: testimonial.location,
    content: testimonial.content,
    rating: testimonial.rating,
    avatar: testimonial.avatar ?? "",
    image: testimonial.image ?? "",
  };
}

export default function TestimonialForm({
  testimonial,
  onSuccess,
  onCancel,
}: TestimonialFormProps) {
  const [form, setForm] = useState<TestimonialFormData>(() =>
    testimonial ? toFormData(testimonial) : emptyForm,
  );
  const [slugTouched, setSlugTouched] = useState(!!testimonial);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof TestimonialFormData>(
    key: K,
    value: TestimonialFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: TestimonialFormData = {
      ...form,
      avatar: form.avatar || undefined,
      image: form.image || undefined,
      rating: Number(form.rating),
    };

    const result = testimonial
      ? await updateTestimonialAction(testimonial._id, payload)
      : await createTestimonialAction(payload);

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
            if (!form.avatar) {
              updateField(
                "avatar",
                name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase(),
              );
            }
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
          label="Rating (1-5)"
          type="number"
          min={1}
          max={5}
          value={form.rating}
          onChange={(e) => updateField("rating", Number(e.target.value))}
          required
        />
        <Input
          label="Avatar initials"
          value={form.avatar ?? ""}
          onChange={(e) => updateField("avatar", e.target.value)}
          placeholder="PS"
        />
      </div>

      <Textarea
        label="Content"
        value={form.content}
        onChange={(e) => updateField("content", e.target.value)}
        required
        rows={5}
      />

      <ImageManager
        mainImage={form.image ?? ""}
        gallery={form.image ? [form.image] : []}
        onMainImageChange={(image) => updateField("image", image)}
        onGalleryChange={(urls) => {
          if (urls[0]) updateField("image", urls[0]);
        }}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving…"
            : testimonial
              ? "Update testimonial"
              : "Create testimonial"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
