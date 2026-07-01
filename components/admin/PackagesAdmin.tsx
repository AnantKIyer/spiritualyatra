"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import PackageForm from "./PackageForm";
import { deletePackageAction, setPackageBoostAction } from "@/app/admin/actions";

const SPLIT_HEIGHT = "h-[calc(100dvh-11.5rem)]";

export default function PackagesAdmin() {
  const packages = useQuery(api.packages.list);
  const [selectedId, setSelectedId] = useState<Id<"packages"> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"packages"> | null>(null);
  const [boostingId, setBoostingId] = useState<Id<"packages"> | null>(null);

  const selected = packages?.find((p) => p._id === selectedId) ?? null;

  useEffect(() => {
    if (packages && packages.length > 0 && !selectedId && !isCreating) {
      setSelectedId(packages[0]._id);
    }
  }, [packages, selectedId, isCreating]);

  if (packages === undefined) {
    return <p className="text-ink-500">Loading packages…</p>;
  }

  async function handleDelete(id: Id<"packages">) {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    setDeletingId(id);
    await deletePackageAction(id);
    setDeletingId(null);
    setIsEditing(false);
    if (selectedId === id) {
      const remaining = (packages ?? []).filter((p) => p._id !== id);
      setSelectedId(remaining[0]?._id ?? null);
    }
  }

  async function handleBoostToggle(id: Id<"packages">, currentlyBoosted: boolean) {
    setBoostingId(id);
    await setPackageBoostAction(id, !currentlyBoosted);
    setBoostingId(null);
  }

  function handleSelect(pkg: Doc<"packages">) {
    setSelectedId(pkg._id);
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
    if (!selectedId && packages?.[0]) {
      setSelectedId(packages[0]._id);
    }
  }

  return (
    <div className={`flex flex-col ${SPLIT_HEIGHT}`}>
      <div className="mb-4 shrink-0">
        <h2 className="font-display text-2xl text-ink-900">Packages</h2>
        <p className="text-ink-600 text-sm mt-0.5">
          Browse and manage travel packages
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
              {packages.length} packages ·{" "}
              {packages.filter((p) => p.boosted).length} featured
            </p>
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Add
            </Button>
          </div>
          <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-ink-50">
            {packages.length === 0 ? (
              <li className="p-4 text-ink-500 text-sm">No packages yet.</li>
            ) : (
              packages.map((pkg) => (
                <li key={pkg._id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(pkg)}
                    className={cn(
                      "w-full text-left p-3 transition-colors hover:bg-saffron-50/50",
                      selectedId === pkg._id &&
                        !isCreating &&
                        "bg-saffron-50 border-l-4 border-l-saffron-500",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink-900 truncate text-sm">
                        {pkg.name}
                      </p>
                      {pkg.boosted && (
                        <span className="px-1.5 py-0.5 bg-saffron-100 text-saffron-700 text-[10px] font-semibold rounded-full shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-ink-500 text-xs mt-0.5">
                      {pkg.duration} · ₹{pkg.price.toLocaleString()}
                    </p>
                    <p className="text-ink-600 text-xs mt-1 truncate">
                      {pkg.slug}
                    </p>
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        <main className="flex-1 min-w-0 min-h-0 h-full bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden flex flex-col">
          {isCreating ? (
            <PackageForm
              key="create"
              layout="panel"
              onSuccess={() => setIsCreating(false)}
              onCancel={handleCancelForm}
            />
          ) : isEditing && selected ? (
            <PackageForm
              key={selected._id}
              pkg={selected}
              layout="panel"
              onSuccess={() => setIsEditing(false)}
              onCancel={() => setIsEditing(false)}
              onDelete={() => handleDelete(selected._id)}
              onBoostToggle={() =>
                handleBoostToggle(selected._id, selected.boosted ?? false)
              }
              isDeleting={deletingId === selected._id}
              isBoosting={boostingId === selected._id}
              isBoosted={selected.boosted ?? false}
            />
          ) : selected ? (
            <PackageDetailPanel
              pkg={selected}
              onEdit={() => setIsEditing(true)}
              onDelete={() => handleDelete(selected._id)}
              onBoostToggle={() =>
                handleBoostToggle(selected._id, selected.boosted ?? false)
              }
              isDeleting={deletingId === selected._id}
              isBoosting={boostingId === selected._id}
            />
          ) : (
            <div className="flex items-center justify-center flex-1 text-ink-500 text-sm">
              Select a package or add a new one.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function PackageDetailPanel({
  pkg,
  onEdit,
  onDelete,
  onBoostToggle,
  isDeleting,
  isBoosting,
}: {
  pkg: Doc<"packages">;
  onEdit: () => void;
  onDelete: () => void;
  onBoostToggle: () => void;
  isDeleting: boolean;
  isBoosting: boolean;
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-start justify-between gap-4 p-5 border-b border-ink-100 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl text-ink-900 truncate">
              {pkg.name}
            </h3>
            {pkg.boosted && (
              <span className="px-2 py-0.5 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full shrink-0">
                Featured
              </span>
            )}
          </div>
          <p className="text-ink-500 text-sm mt-0.5">{pkg.duration}</p>
        </div>
        <Button variant="primary" size="sm" onClick={onEdit} className="shrink-0">
          Edit
        </Button>
      </div>

      <div className="p-5 flex-1 min-h-0 overflow-hidden space-y-4">
        {pkg.image ? (
          <div className="relative w-full h-36 rounded-xl overflow-hidden shrink-0">
            <Image
              src={pkg.image}
              alt={pkg.name}
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
          <DetailStat label="Slug" value={pkg.slug} />
          <DetailStat label="Price" value={`₹${pkg.price.toLocaleString()}`} />
          <DetailStat label="Duration" value={pkg.duration} />
          <DetailStat
            label="Itinerary"
            value={`${pkg.itinerary.length} days`}
          />
        </div>

        <div className="min-h-0">
          <h4 className="text-sm font-semibold text-ink-700 mb-1">
            Description
          </h4>
          <p className="text-ink-600 text-sm leading-relaxed line-clamp-3">
            {pkg.description}
          </p>
        </div>

        {pkg.destinations.length > 0 && (
          <div className="shrink-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1.5">
              Destinations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {pkg.destinations.map((dest) => (
                <span
                  key={dest}
                  className="px-2 py-0.5 rounded-full bg-ink-100 text-ink-700 text-xs font-medium"
                >
                  {dest}
                </span>
              ))}
            </div>
          </div>
        )}

        {pkg.highlights.length > 0 && (
          <div className="min-h-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1">
              Highlights ({pkg.highlights.length})
            </h4>
            <ul className="list-disc list-inside text-sm text-ink-600 space-y-0.5">
              {pkg.highlights.slice(0, 3).map((h) => (
                <li key={h} className="truncate">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {pkg.inclusions && pkg.inclusions.length > 0 && (
          <div className="min-h-0">
            <h4 className="text-sm font-semibold text-ink-700 mb-1">
              Inclusions ({pkg.inclusions.length})
            </h4>
            <ul className="list-disc list-inside text-sm text-ink-600 space-y-0.5">
              {pkg.inclusions.slice(0, 3).map((item) => (
                <li key={item} className="truncate">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-ink-100 shrink-0 flex flex-wrap gap-3">
        <Button
          variant={pkg.boosted ? "primary" : "outline"}
          size="sm"
          onClick={onBoostToggle}
          disabled={isBoosting}
        >
          {isBoosting ? "…" : pkg.boosted ? "Unboost" : "Boost to featured"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          {isDeleting ? "Deleting…" : "Delete package"}
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
