"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import PackageForm from "./PackageForm";
import AdminEntitySplitLayout, {
  DetailStat,
  EntityPanelShell,
  PanelImage,
  PanelSection,
} from "./AdminEntitySplitLayout";
import { deletePackageAction, setPackageBoostAction } from "@/app/admin/actions";

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

  function cancelForm() {
    setIsCreating(false);
    setIsEditing(false);
    const first = packages?.[0];
    if (first) setSelectedId(first._id);
  }

  return (
    <AdminEntitySplitLayout
      title="Packages"
      subtitle="Browse and manage travel packages"
      sidebarCount={
        <span>
          {packages.length} packages · {packages.filter((p) => p.boosted).length}{" "}
          featured
        </span>
      }
      sidebarAction={
        <Button variant="primary" size="sm" onClick={handleCreate}>
          Add
        </Button>
      }
      sidebar={
        <ul className="divide-y divide-ink-50">
          {packages.length === 0 ? (
            <li className="p-4 text-ink-500 text-sm">No packages yet.</li>
          ) : (
            packages.map((pkg) => (
              <li key={pkg._id}>
                <button
                  type="button"
                  onClick={() => handleSelect(pkg)}
                  className={cn(
                    "w-full text-left p-4 transition-colors hover:bg-saffron-50/50",
                    selectedId === pkg._id &&
                      !isCreating &&
                      "bg-saffron-50 border-l-4 border-l-saffron-500",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink-900 truncate">{pkg.name}</p>
                    {pkg.boosted && (
                      <span className="px-1.5 py-0.5 bg-saffron-100 text-saffron-700 text-[10px] font-semibold rounded-full shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-ink-500 text-xs mt-0.5">
                    {pkg.duration} · ₹{pkg.price.toLocaleString()}
                  </p>
                  <p className="text-ink-600 text-xs mt-1 truncate">{pkg.slug}</p>
                </button>
              </li>
            ))
          )}
        </ul>
      }
    >
      {isCreating ? (
        <PackageForm
          key="create"
          variant="panel"
          onSuccess={() => setIsCreating(false)}
          onCancel={cancelForm}
        />
      ) : isEditing && selected ? (
        <PackageForm
          key={selected._id}
          pkg={selected}
          variant="panel"
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
          footerExtra={
            <>
              <Button
                type="button"
                variant={selected.boosted ? "primary" : "outline"}
                size="sm"
                onClick={() =>
                  handleBoostToggle(selected._id, selected.boosted ?? false)
                }
                disabled={boostingId === selected._id}
              >
                {boostingId === selected._id
                  ? "…"
                  : selected.boosted
                    ? "Unboost"
                    : "Boost to featured"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDelete(selected._id)}
                disabled={deletingId === selected._id}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {deletingId === selected._id ? "Deleting…" : "Delete package"}
              </Button>
            </>
          }
        />
      ) : selected ? (
        <EntityPanelShell
          header={
            <>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl text-ink-900">
                  {selected.name}
                </h3>
                {selected.boosted && (
                  <span className="px-2 py-0.5 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-ink-500 text-sm mt-1">{selected.duration}</p>
            </>
          }
          actions={
            <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          }
          footer={
            <>
              <Button
                variant={selected.boosted ? "primary" : "outline"}
                size="sm"
                onClick={() =>
                  handleBoostToggle(selected._id, selected.boosted ?? false)
                }
                disabled={boostingId === selected._id}
              >
                {boostingId === selected._id
                  ? "…"
                  : selected.boosted
                    ? "Unboost"
                    : "Boost to featured"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(selected._id)}
                disabled={deletingId === selected._id}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {deletingId === selected._id ? "Deleting…" : "Delete package"}
              </Button>
            </>
          }
        >
          <PanelImage src={selected.image} alt={selected.name} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <DetailStat label="Slug" value={selected.slug} />
            <DetailStat
              label="Price"
              value={`₹${selected.price.toLocaleString()}`}
            />
            <DetailStat label="Duration" value={selected.duration} />
            <DetailStat
              label="Itinerary"
              value={`${selected.itinerary.length} days`}
            />
          </div>

          <PanelSection title="Description">
            <p className="text-ink-600 text-sm leading-relaxed line-clamp-3">
              {selected.description}
            </p>
          </PanelSection>

          {selected.destinations.length > 0 && (
            <PanelSection title="Destinations">
              <div className="flex flex-wrap gap-2">
                {selected.destinations.map((dest) => (
                  <span
                    key={dest}
                    className="px-2.5 py-1 rounded-full bg-ink-100 text-ink-700 text-xs font-medium"
                  >
                    {dest}
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

          {selected.inclusions && selected.inclusions.length > 0 && (
            <PanelSection title="Inclusions">
              <ul className="list-disc list-inside text-sm text-ink-600 space-y-0.5">
                {selected.inclusions.slice(0, 3).map((item) => (
                  <li key={item} className="truncate">
                    {item}
                  </li>
                ))}
              </ul>
            </PanelSection>
          )}
        </EntityPanelShell>
      ) : (
        <div className="flex items-center justify-center h-full text-ink-500">
          Select a package or add a new one.
        </div>
      )}
    </AdminEntitySplitLayout>
  );
}
