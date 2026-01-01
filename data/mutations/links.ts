import db from "@/db";
import {
  links,
  linkClicks,
  type NewLink,
  type NewLinkClick,
} from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export async function createLink(data: NewLink) {
  const [newLink] = await db.insert(links).values(data).returning();
  return newLink;
}

export async function incrementLinkClicks(
  linkId: number,
  clickData?: Omit<NewLinkClick, "linkId">
) {
  // Increment the click count on the link
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.id, linkId));

  // Record detailed click analytics if provided
  if (clickData) {
    await db.insert(linkClicks).values({
      linkId,
      ...clickData,
    });
  }
}

export async function updateLink(
  linkId: number,
  userId: string,
  data: { originalUrl?: string; title?: string | null }
) {
  const [updatedLink] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();
  return updatedLink;
}

export async function deleteLink(linkId: number, userId: string) {
  const [deletedLink] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();
  return deletedLink;
}
