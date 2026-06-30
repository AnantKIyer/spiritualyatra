"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginAction } from "@/app/admin/actions";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result && !result.success) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
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
