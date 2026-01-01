import db from "@/db";
import { links, type NewLink } from "@/db/schema";

export async function createLink(data: NewLink) {
  const [newLink] = await db.insert(links).values(data).returning();
  return newLink;
}
