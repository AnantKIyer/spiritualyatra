"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DestinationForm from "./DestinationForm";
import AdminEntitySplitLayout, {
  DetailStat,
  EntityPanelShell,
  PanelImage,
  PanelSection,
} from "./AdminEntitySplitLayout";
import { deleteDestinationAction } from "@/app/admin/actions";

export default function DestinationsAdmin() {
  const destinations = useQuery(api.destinations.list);
  const [selectedId, setSelectedId] = useState<Id<"destinations"> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"destinations"> | null>(null);

  const selected = destinations?.find((d) => d._id === selectedId) ?? null;

  useEffect(() => {
    if (destinations && destinations.length > 0 && !selectedId && !isCreating) {
      setSelectedId(destinations[0]._id);
    }
  }, [destinations, selectedId, isCreating]);

  if (destinations === undefined) {
    return <p className="text-ink-500">Loading destinations…</p>;
  }

  async function handleDelete(id: Id<"destinations">) {
    if (!confirm("Delete this destination? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteDestinationAction(id);
    setDeletingId(null);
    setIsEditing(false);
    if (selectedId === id) {
      const remaining = (destinations ?? []).filter((d) => d._id !== id);
      setSelectedId(remaining[0]?._id ?? null);
    }
  }

  function handleSelect(dest: Doc<"destinations">) {
    setSelectedId(dest._id);
    setIsEditing(false);
    setIsCreating(false);
  }

  function handleCreate() {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedId(null);
  }

  function cancelForm() {
    setIsCreating(false);
    setIsEditing(false);
    const first = destinations?.[0];
    if (first) setSelectedId(first._id);
  }

  return (
    <AdminEntitySplitLayout
      title="Destinations"
      subtitle="Browse and manage your destination catalog"
      sidebarCount={<span>{destinations.length} destinations</span>}
      sidebarAction={
        <Button variant="primary" size="sm" onClick={handleCreate}>
          Add
        </Button>
      }
      sidebar={
        <ul className="divide-y divide-ink-50">
          {destinations.length === 0 ? (
            <li className="p-4 text-ink-500 text-sm">No destinations yet.</li>
          ) : (
            destinations.map((dest) => (
              <li key={dest._id}>
                <button
                  type="button"
                  onClick={() => handleSelect(dest)}
                  className={cn(
                    "w-full text-left p-4 transition-colors hover:bg-saffron-50/50",
                    selectedId === dest._id &&
                      !isCreating &&
                      "bg-saffron-50 border-l-4 border-l-saffron-500",
                  )}
                >
                  <p className="font-medium text-ink-900 truncate">{dest.name}</p>
                  <p className="text-ink-500 text-xs mt-0.5 truncate">
                    {dest.location}
                  </p>
                  <p className="text-ink-600 text-xs mt-1">
                    {dest.basePrice
                      ? `₹${dest.basePrice.toLocaleString()}`
                      : "No price"}{" "}
                    · {dest.slug}
                  </p>
                </button>
              </li>
            ))
          )}
        </ul>
      }
    >
      {isCreating ? (
        <DestinationForm
          key="create"
          variant="panel"
          onSuccess={() => setIsCreating(false)}
          onCancel={cancelForm}
        />
      ) : isEditing && selected ? (
        <DestinationForm
          key={selected._id}
          destination={selected}
          variant="panel"
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
          footerExtra={
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDelete(selected._id)}
              disabled={deletingId === selected._id}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {deletingId === selected._id ? "Deleting…" : "Delete destination"}
            </Button>
          }
        />
      ) : selected ? (
        <EntityPanelShell
          header={
            <>
              <h3 className="font-display text-2xl text-ink-900">
                {selected.name}
              </h3>
              <p className="text-ink-500 text-sm mt-1">{selected.location}</p>
            </>
          }
          actions={
            <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          }
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(selected._id)}
              disabled={deletingId === selected._id}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {deletingId === selected._id ? "Deleting…" : "Delete destination"}
            </Button>
          }
        >
          <PanelImage src={selected.image} alt={selected.name} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <DetailStat label="Slug" value={selected.slug} />
            <DetailStat
              label="Base price"
              value={
                selected.basePrice
                  ? `₹${selected.basePrice.toLocaleString()}`
                  : "—"
              }
            />
            <DetailStat label="Duration" value={selected.duration ?? "—"} />
            <DetailStat label="Best time" value={selected.bestTime ?? "—"} />
          </div>

          <PanelSection title="Description">
            <p className="text-ink-600 text-sm leading-relaxed line-clamp-3">
              {selected.description}
            </p>
          </PanelSection>

          {selected.labels && selected.labels.length > 0 && (
            <PanelSection title="Labels">
              <div className="flex flex-wrap gap-2">
                {selected.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2.5 py-1 rounded-full bg-ink-100 text-ink-700 text-xs font-medium capitalize"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </PanelSection>
          )}

          {selected.highlights.length > 0 && (
            <PanelSection title={`Highlights (${selected.highlights.length})`}>
              <ul className="list-disc list-inside text-sm text-ink-600 space-y-0.5">
                {selected.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="truncate">
                    {h}
                  </li>
                ))}
              </ul>
            </PanelSection>
          )}

          {selected.tripPlan.length > 0 && (
            <PanelSection title={`Trip plan (${selected.tripPlan.length} days)`}>
              <div className="space-y-2">
                {selected.tripPlan.slice(0, 2).map((day) => (
                  <div key={day.day} className="p-3 rounded-lg bg-ink-50 text-sm">
                    <p className="font-medium text-ink-900 truncate">
                      {day.day}: {day.title}
                    </p>
                    <p className="text-ink-600 text-xs mt-1 line-clamp-1">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </PanelSection>
          )}
        </EntityPanelShell>
      ) : (
        <div className="flex items-center justify-center h-full text-ink-500">
          Select a destination or add a new one.
        </div>
      )}
    </AdminEntitySplitLayout>
  );
}
