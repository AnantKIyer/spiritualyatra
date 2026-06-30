"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "@/components/ui/Button";
import DestinationForm from "./DestinationForm";
import { deleteDestinationAction } from "@/app/admin/actions";

export default function DestinationsAdmin() {
  const destinations = useQuery(api.destinations.list);
  const [editing, setEditing] = useState<Doc<"destinations"> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"destinations"> | null>(null);

  if (destinations === undefined) {
    return <p className="text-ink-500">Loading destinations…</p>;
  }

  async function handleDelete(id: Id<"destinations">) {
    if (!confirm("Delete this destination? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteDestinationAction(id);
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
          {editing ? `Edit: ${editing.name}` : "Add destination"}
        </h3>
        <DestinationForm
          key={editing?._id ?? "create"}
          destination={editing ?? undefined}
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
          <h2 className="font-display text-3xl text-ink-900">Destinations</h2>
          <p className="text-ink-600 text-sm mt-1">
            {destinations.length} destinations
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          Add destination
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-left text-ink-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest._id} className="border-b border-ink-50">
                  <td className="px-4 py-3 text-ink-900 font-medium">
                    {dest.name}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{dest.slug}</td>
                  <td className="px-4 py-3 text-ink-600">{dest.location}</td>
                  <td className="px-4 py-3 text-ink-600">
                    {dest.basePrice
                      ? `₹${dest.basePrice.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(dest)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(dest._id)}
                      disabled={deletingId === dest._id}
                    >
                      {deletingId === dest._id ? "Deleting…" : "Delete"}
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
