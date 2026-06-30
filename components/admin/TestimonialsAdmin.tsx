"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "@/components/ui/Button";
import TestimonialForm from "./TestimonialForm";
import { deleteTestimonialAction } from "@/app/admin/actions";

export default function TestimonialsAdmin() {
  const testimonials = useQuery(api.testimonials.list);
  const [editing, setEditing] = useState<Doc<"testimonials"> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"testimonials"> | null>(
    null,
  );

  if (testimonials === undefined) {
    return <p className="text-ink-500">Loading testimonials…</p>;
  }

  async function handleDelete(id: Id<"testimonials">) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteTestimonialAction(id);
    setDeletingId(null);
    if (editing?._id === id) {
      setEditing(null);
      setIsCreating(false);
    }
  }

  if (isCreating || editing) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-8">
        <h3 className="font-display text-xl text-ink-900 mb-6">
          {editing ? `Edit: ${editing.name}` : "Add testimonial"}
        </h3>
        <TestimonialForm
          key={editing?._id ?? "create"}
          testimonial={editing ?? undefined}
          onSuccess={() => {
            setEditing(null);
            setIsCreating(false);
          }}
          onCancel={() => {
            setEditing(null);
            setIsCreating(false);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl text-ink-900">Testimonials</h2>
          <p className="text-ink-600 text-sm mt-1">
            {testimonials.length} testimonials
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          Add testimonial
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-left text-ink-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Content</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr key={item._id} className="border-b border-ink-50">
                  <td className="px-4 py-3 text-ink-900 font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{item.location}</td>
                  <td className="px-4 py-3 text-ink-600">{item.rating}/5</td>
                  <td className="px-4 py-3 text-ink-600 max-w-xs truncate">
                    {item.content}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? "Deleting…" : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
