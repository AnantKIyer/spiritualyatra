"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { establishSessionAction } from "@/app/admin/actions";
import { isConvexConfigured } from "@/lib/convex/url";
import { getErrorMessage } from "@/lib/errors";

export default function LoginForm() {
  const ensureDefaultAdmin = useMutation(api.adminAuth.ensureDefaultAdmin);
  const login = useMutation(api.adminAuth.login);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!isConvexConfigured()) {
      setError(
        "Database is not configured. Set NEXT_PUBLIC_CONVEX_URL and redeploy.",
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!username || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await ensureDefaultAdmin({});
      const result = await login({ username, password });
      const session = await establishSessionAction(result.token);

      if (!session.success) {
        setError(session.error);
        setIsLoading(false);
        return;
      }

      window.location.assign("/admin");
    } catch (caught) {
      setError(
        getErrorMessage(
          caught,
          "Sign-in failed. Check your credentials and try again.",
        ),
      );
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}
      <Input
        label="Username"
        name="username"
        type="text"
        required
        autoComplete="username"
        defaultValue="admin-user"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
