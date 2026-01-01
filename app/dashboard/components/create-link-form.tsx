"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLinkAction } from "./actions";

interface CreateLinkFormProps {
  onSuccess?: () => void;
}

export function CreateLinkForm({ onSuccess }: CreateLinkFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const originalUrl = formData.get("originalUrl") as string;
    const title = formData.get("title") as string;
    const customShortCode = formData.get("customShortCode") as string;

    startTransition(async () => {
      const result = await createLinkAction({
        originalUrl,
        title: title || undefined,
        customShortCode: customShortCode || undefined,
      });

      if ("error" in result) {
        setError(result.error);
      } else {
        setSuccessMessage(`Link created: /${result.data.shortCode}`);
        // Reset form
        (e.target as HTMLFormElement).reset();
        // Close dialog after short delay to show success
        setTimeout(() => {
          onSuccess?.();
        }, 1000);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="originalUrl">URL to shorten *</Label>
        <Input
          id="originalUrl"
          name="originalUrl"
          type="url"
          placeholder="https://example.com/very/long/url"
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title (optional)</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="My awesome link"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customShortCode">Custom short code (optional)</Label>
        <Input
          id="customShortCode"
          name="customShortCode"
          type="text"
          placeholder="my-link"
          pattern="[A-Za-z0-9]*"
          minLength={4}
          maxLength={20}
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to auto-generate. Must be 4-20 alphanumeric characters.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {successMessage && (
        <p className="text-sm text-green-600 dark:text-green-400">
          {successMessage}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Link"}
      </Button>
    </form>
  );
}
