import { ConvexError } from "convex/values";

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ConvexError) {
    if (typeof error.data === "string" && error.data.trim()) {
      return error.data;
    }
    if (error.message.trim()) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    if (error.message.trim()) {
      return error.message;
    }
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}
