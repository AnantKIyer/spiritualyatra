import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export const metadata = {
  title: "Admin Settings - Spiritual Yatra",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-ink-900">Account settings</h2>
        <p className="text-ink-500 mt-2">
          Update your admin password. Credentials are stored securely in Convex.
        </p>
      </div>

      <section className="bg-white rounded-2xl border border-ink-100 shadow-sm p-6 md:p-8">
        <h3 className="font-semibold text-lg text-ink-900 mb-6">
          Change password
        </h3>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
