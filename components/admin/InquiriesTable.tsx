"use client";

import { useRouter } from "next/navigation";
import type { Doc } from "@/convex/_generated/dataModel";
import { updateInquiryStatusAction } from "@/app/admin/actions";

interface InquiriesTableProps {
  inquiries: Doc<"contactInquiries">[];
}

export default function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const router = useRouter();

  async function handleStatusChange(
    id: Doc<"contactInquiries">["_id"],
    status: "new" | "contacted" | "closed",
  ) {
    await updateInquiryStatusAction(id, status);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left text-ink-500">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Package</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-500">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="border-b border-ink-50">
                  <td className="px-4 py-3 text-ink-900 font-medium align-top">
                    {inquiry.name}
                  </td>
                  <td className="px-4 py-3 text-ink-600 align-top">
                    <div>{inquiry.email}</div>
                    <div className="text-ink-500">{inquiry.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-600 align-top">
                    {inquiry.packageSlug ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-600 align-top max-w-xs">
                    {inquiry.message}
                  </td>
                  <td className="px-4 py-3 text-ink-500 align-top whitespace-nowrap">
                    {new Date(inquiry._creationTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        handleStatusChange(
                          inquiry._id,
                          e.target.value as "new" | "contacted" | "closed",
                        )
                      }
                      className="border border-ink-200 rounded-lg px-2 py-1 text-sm bg-white capitalize"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
