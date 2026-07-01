"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DestinationForm from "./DestinationForm";
import { deleteDestinationAction } from "@/app/admin/actions";

const SPLIT_HEIGHT = "h-[calc(100dvh-11.5rem)]";

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

  function handleCancelForm() {
    setIsCreating(false);
    setIsEditing(false);
    if (!selectedId && destinations?.[0]) {
      setSelectedId(destinations[0]._id);
    }
  }

  return (
    <div className={`flex flex-col ${SPLIT_HEIGHT}`}>
      <div className="mb-4 shrink-0">
        <h2 className="font-display text-2xl text-ink-900">Destinations</h2>
        <p className="text-ink-600 text-sm mt-0.5">
          Browse and manage your destination catalog
        </p>
      </div>

      <div className="flex flex-1 min-h-0 flex-col lg:flex-row gap-4">
        <aside
          className={cn(
            "w-full lg:w-[30%] shrink-0 flex flex-col min-h-0",
            "bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden",
            "lg:max-h-full",
          )}
        >
          <div className="p-3 border-b border-ink-100 flex items-center justify-between gap-2 shrink-0">
            <p className="text-sm font-medium text-ink-700">
              {destinations.length} destinations
            </p>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Add
            </Button>
          </div>
          <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-ink-50">
            {destinations.length === 0 ? (
              <li className="p-4 text-ink-500 text-sm">No destinations yet.</li>
            ) : (
              destinations.map((dest) => (
                <li key={dest._id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(dest)}
                    className={cn(
                      "w-full text-left p-3 transition-colors hover:bg-saffron-50/50",
                      selectedId === dest._id &&
                        !isCreating &&
                        "bg-saffron-50 border-l-4 border-l-saffron-500",
                    )}
                  >
                    <p className="font-medium text-ink-900 truncate text-sm">
                      {dest.name}
                    </p>
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
        </aside>

        <main className="flex-1 min-w-0 min-h-0 h-full bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden flex flex-col">
          {isCreating ? (
            <DestinationForm
              key="create"
              layout="panel"
              onSuccess={() => setIsCreating(false)}
              onCancel={handleCancelForm}
            />
          ) : isEditing && selected ? (
            <DestinationForm
              key={selected._id}
              destination={selected}
              layout="panel"
              onSuccess={() => setIsEditing(false)}
              onCancel={() => setIsEditing(false)}
              onDelete={() => handleDelete(selected._id)}
              isDeleting={deletingId === selected._id}
            />
          ) : selected ? (
            <DestinationDetailPanel
              destination={selected}
              onEdit={() => setIsEditing(true)}
              onDelete={() => handleDelete(selected._id)}
              isDeleting={deletingId === selected._id}
            />
          ) : (
            <div className="flex items-center justify-center flex-1 text-ink-500 text-sm">
              Select a destination or add a new one.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function DestinationDetailPanel({
  destination,
  onEdit,
  onDelete,
  isDeleting,
}: {
  destination: Doc<"destinations">;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-start justify-between gap-4 p-5 border-b border-ink-100 shrink-0">
        <div className="min-w-0">
          <h3 className="font-display text-xl text-ink-900 truncate">
            {destination.name}
          </h3>
          <p className="text-ink-500 text-sm mt-0.5">{destination.location}</p>
        </div>
        <Button variant="primary" size="sm" onClick={onEdit} className="shrink-0">
          Edit
        </Button>
      </div>

      <div className="p-5 flex-1 min-h-0 overflow-hidden space-y-4">
        {destination.image ? (
          <div className="relative w-full h-36 rounded-xl overflow-hidden shrink-0">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-36 rounded-xl bg-ink-50 border border-dashed border-ink-200 flex items-center justify-center text-ink-400 text-sm shrink-0">
            No image
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <DetailStat label="Slug" value={destination.slug} />
          <DetailStat
            label="Base price"
            value={
              destination.basePrice
                ? `₹${destination.basePrice.toLocaleString()}`
                : "—"
            }
          />
          <DetailStat label="Duration" value={destination.duration ?? "—"} />
          <DetailStat label="Best time" value={destination.bestTime ?? "—"} />
        </div>

        <div className="min-h-0">
          <h4 className="text-sm font-semibold text-ink-700 mb-1">
            Description
          </h4>
          <p className="text-ink-600 text-sm leading-relaxed line-clamp-2">
            {destination.description}
          </p>
        </div>

        <div className="min-h-0">
          <h4 className="text-sm font-semibold text-ink-700 mb-1">
            Long description
          </h4>
          <p className="text-ink-600 text-sm leading-relaxed line-clamp-2">
            {destination.longDescription}
          </p>
        </div>

        {destination.labels && destination.labels.length > 0 && (
          <div className="shrink-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1.5">Labels</h4>
            <div className="flex flex-wrap gap-1.5">
              {destination.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 rounded-full bg-ink-100 text-ink-700 text-xs font-medium capitalize"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {destination.highlights.length > 0 && (
          <div className="min-h-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1">
              Highlights ({destination.highlights.length})
            </h4>
            <ul className="list-disc list-inside text-sm text-ink-600 space-y-0.5">
              {destination.highlights.slice(0, 3).map((h) => (
                <li key={h} className="truncate">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {destination.tripPlan.length > 0 && (
          <div className="min-h-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1.5">
              Trip plan ({destination.tripPlan.length} days)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.tripPlan.slice(0, 2).map((day) => (
                <div key={day.day} className="p-2.5 rounded-lg bg-ink-50 text-sm">
                  <p className="font-medium text-ink-900 truncate">
                    {day.day}: {day.title}
                  </p>
                  <p className="text-ink-600 text-xs mt-0.5 line-clamp-1">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-ink-100 shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          {isDeleting ? "Deleting…" : "Delete destination"}
        </Button>
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-xl bg-ink-50">
      <p className="text-ink-500 text-xs">{label}</p>
      <p className="text-ink-900 font-medium text-sm mt-0.5 truncate">{value}</p>
    </div>
  );
}
