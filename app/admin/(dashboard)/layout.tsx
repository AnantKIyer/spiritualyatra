import { requireAdminSession } from "@/lib/admin/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-saffron-50/30">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">{children}</div>
    </div>
  );
}
