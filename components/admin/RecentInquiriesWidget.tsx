import Link from "next/link";
import type { Doc } from "@/convex/_generated/dataModel";

interface RecentInquiriesWidgetProps {
  inquiries: Doc<"contactInquiries">[];
  limit?: number;
}

export default function RecentInquiriesWidget({
  inquiries,
  limit = 6,
}: RecentInquiriesWidgetProps) {
  const recent = inquiries.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-display text-lg text-ink-900">
            Recent Inquiries
          </h3>
          <p className="text-ink-500 text-sm">Latest traveler contact requests</p>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-saffron-600 hover:text-saffron-700 text-sm font-medium whitespace-nowrap"
        >
          View all →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="text-ink-500 text-sm">No inquiries yet.</p>
      ) : (
        <ul className="space-y-3 flex-1">
          {recent.map((inquiry) => (
            <li
              key={inquiry._id}
              className="flex items-start justify-between gap-3 p-3 rounded-xl border border-ink-50 hover:border-saffron-100 hover:bg-saffron-50/30 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-ink-900 font-medium truncate">
                  {inquiry.name}
                </p>
                <p className="text-ink-500 text-xs truncate">{inquiry.email}</p>
                <p className="text-ink-600 text-xs mt-1 truncate">
                  {inquiry.packageSlug ?? "General inquiry"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-saffron-100 text-saffron-800 capitalize">
                  {inquiry.status}
                </span>
                <p className="text-ink-400 text-[11px] mt-1 whitespace-nowrap">
                  {new Date(inquiry._creationTime).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
