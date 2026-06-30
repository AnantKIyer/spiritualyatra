"use client";

import { useActionState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { changePasswordAction } from "@/app/admin/actions";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      const form = document.getElementById(
        "change-password-form",
      ) as HTMLFormElement | null;
      form?.reset();
    }
  }, [state]);

  return (
    <form
      id="change-password-form"
      action={formAction}
      className="space-y-6 max-w-lg"
    >
      {state?.success && (
        <div
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-sm"
          role="status"
        >
          Password updated successfully.
        </div>
      )}
      {state && !state.success && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <Input
        label="Current password"
        name="currentPassword"
        type="password"
        required
        autoComplete="current-password"
      />
      <Input
        label="New password"
        name="newPassword"
        type="password"
        required
        autoComplete="new-password"
        minLength={8}
      />
      <Input
        label="Confirm new password"
        name="confirmPassword"
        type="password"
        required
        autoComplete="new-password"
        minLength={8}
      />

      <p className="text-sm text-ink-500">
        Use at least 8 characters. Other active sessions will be signed out.
      </p>

      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
