"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginAction } from "@/app/admin/actions";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state && !state.success && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm"
          role="alert"
        >
          {state.error}
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
        disabled={isPending}
      >
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
