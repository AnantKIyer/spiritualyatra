import { fetchQuery } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { requireSessionToken } from "@/lib/admin/auth";
import InquiriesTable from "@/components/admin/InquiriesTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin - Inquiries",
};

export default async function AdminInquiriesPage() {
  const inquiries = await fetchQuery(api.contactInquiries.list, {
    sessionToken: await requireSessionToken(),
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl text-ink-900">Contact Inquiries</h2>
        <p className="text-ink-600 text-sm mt-1">
          {inquiries.length} total inquiries
        </p>
      </div>
      <InquiriesTable inquiries={inquiries} />
    </div>
  );
}
