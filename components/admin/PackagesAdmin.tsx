"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "@/components/ui/Button";
import PackageForm from "./PackageForm";
import { deletePackageAction, setPackageBoostAction } from "@/app/admin/actions";

export default function PackagesAdmin() {
  const packages = useQuery(api.packages.list);
  const [editing, setEditing] = useState<Doc<"packages"> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"packages"> | null>(null);
  const [boostingId, setBoostingId] = useState<Id<"packages"> | null>(null);

  if (packages === undefined) {
    return <p className="text-ink-500">Loading packages…</p>;
  }

  async function handleDelete(id: Id<"packages">) {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    setDeletingId(id);
    await deletePackageAction(id);
    setDeletingId(null);
    if (editing?._id === id) {
      setEditing(null);
      setIsCreating(false);
    }
  }

  async function handleBoostToggle(id: Id<"packages">, currentlyBoosted: boolean) {
    setBoostingId(id);
    await setPackageBoostAction(id, !currentlyBoosted);
    setBoostingId(null);
  }

  if (isCreating || editing) {
    return (
      <div className="bg-white rounded-2xl border border-ink-100 p-6 md:p-8">
        <h3 className="font-display text-xl text-ink-900 mb-6">
          {editing ? `Edit: ${editing.name}` : "Add package"}
        </h3>
        <PackageForm
          key={editing?._id ?? "create"}
          pkg={editing ?? undefined}
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
          <h2 className="font-display text-3xl text-ink-900">Packages</h2>
          <p className="text-ink-600 text-sm mt-1">
            {packages.length} packages ·{" "}
            {packages.filter((p) => p.boosted).length} featured
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          Add package
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-left text-ink-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id} className="border-b border-ink-50">
                  <td className="px-4 py-3 text-ink-900 font-medium">
                    <div className="flex items-center gap-2">
                      {pkg.name}
                      {pkg.boosted && (
                        <span className="px-2 py-0.5 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{pkg.duration}</td>
                  <td className="px-4 py-3 text-ink-600">
                    ₹{pkg.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant={pkg.boosted ? "primary" : "outline"}
                      size="sm"
                      onClick={() =>
                        handleBoostToggle(pkg._id, pkg.boosted ?? false)
                      }
                      disabled={boostingId === pkg._id}
                    >
                      {boostingId === pkg._id
                        ? "…"
                        : pkg.boosted
                          ? "Boosted"
                          : "Boost"}
                    </Button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(pkg)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(pkg._id)}
                      disabled={deletingId === pkg._id}
                    >
                      {deletingId === pkg._id ? "Deleting…" : "Delete"}
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
