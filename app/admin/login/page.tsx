import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login - Spiritual Yatra",
};

export default async function AdminLoginPage() {
  try {
    await fetchMutation(api.adminAuth.ensureDefaultAdmin, {});
  } catch {
    // Login form will show a clearer error if Convex is unreachable.
  }

  return (
    <div className="min-h-screen bg-gradient-sacred flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-indian-lg border border-saffron-100 p-8 md:p-10">
        <div className="mb-8 text-center">
          <p className="text-saffron-600 font-semibold uppercase tracking-widest text-sm mb-2">
            Spiritual Yatra
          </p>
          <h1 className="font-display text-2xl text-ink-900">Admin Login</h1>
          <p className="text-ink-500 text-sm mt-2">
            Sign in to manage destinations, packages, and inquiries.
          </p>
        </div>
        <LoginForm />
        <p className="text-xs text-ink-400 mt-6 text-center">
          Default account after setup: admin-user / password
        </p>
      </div>
    </div>
  );
}
