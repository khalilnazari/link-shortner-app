"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/mutations/links";
import { getLinkByShortCode } from "@/data/queries/links";
import { generateShortCode } from "@/lib/short-code";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  title: z.string().max(255).optional(),
  customShortCode: z
    .string()
    .regex(/^[A-Za-z0-9]*$/, "Short code can only contain letters and numbers")
    .min(4, "Short code must be at least 4 characters")
    .max(20, "Short code must be at most 20 characters")
    .optional()
    .or(z.literal("")),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

type CreateLinkResult =
  | { success: true; data: { shortCode: string } }
  | { error: string };

export async function createLinkAction(
  input: CreateLinkInput
): Promise<CreateLinkResult> {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to create a link" };
  }

  // Validate input
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError?.message || "Invalid input" };
  }

  const { originalUrl, title, customShortCode } = parsed.data;

  // Generate or use custom short code
  let shortCode: string;

  if (customShortCode && customShortCode.length > 0) {
    // Check if custom short code is already taken
    const existing = await getLinkByShortCode(customShortCode);
    if (existing.length > 0) {
      return { error: "This short code is already taken" };
    }
    shortCode = customShortCode;
  } else {
    // Generate unique short code
    let attempts = 0;
    const maxAttempts = 5;

    do {
      shortCode = generateShortCode();
      const existing = await getLinkByShortCode(shortCode);
      if (existing.length === 0) break;
      attempts++;
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return {
        error: "Failed to generate unique short code. Please try again.",
      };
    }
  }

  // Create the link
  const newLink = await createLink({
    shortCode,
    originalUrl,
    userId,
    title: title || null,
  });

  if (!newLink) {
    return { error: "Failed to create link" };
  }

  revalidatePath("/dashboard");

  return { success: true, data: { shortCode: newLink.shortCode } };
}

const updateLinkSchema = z.object({
  linkId: z.number(),
  originalUrl: z.string().url("Please enter a valid URL"),
  title: z.string().max(255).optional(),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

type UpdateLinkResult = { success: true } | { error: string };

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<UpdateLinkResult> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to update a link" };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError?.message || "Invalid input" };
  }

  const { linkId, originalUrl, title } = parsed.data;

  const updatedLink = await updateLink(linkId, userId, {
    originalUrl,
    title: title || null,
  });

  if (!updatedLink) {
    return { error: "Failed to update link" };
  }

  revalidatePath("/dashboard");

  return { success: true };
}

const deleteLinkSchema = z.object({
  linkId: z.number(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

type DeleteLinkResult = { success: true } | { error: string };

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<DeleteLinkResult> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be logged in to delete a link" };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { error: firstError?.message || "Invalid input" };
  }

  const { linkId } = parsed.data;

  const deletedLink = await deleteLink(linkId, userId);

  if (!deletedLink) {
    return { error: "Failed to delete link" };
  }

  revalidatePath("/dashboard");

  return { success: true };
}
