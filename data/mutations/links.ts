import db from "@/db";
import {
  links,
  linkClicks,
  type NewLink,
  type NewLinkClick,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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
