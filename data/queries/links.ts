import db from "@/db";
import { links } from "@/db/schema";
import { eq, desc, count } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db.select().from(links).where(eq(links.userId, userId));
}

export async function getLinksByUserIdPaginated(
  userId: string,
  page: number = 1,
  limit: number = 5
) {
  const offset = (page - 1) * limit;

  const [userLinks, totalCountResult] = await Promise.all([
    db
      .select()
      .from(links)
      .where(eq(links.userId, userId))
      .orderBy(desc(links.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(links).where(eq(links.userId, userId)),
  ]);

  const totalCount = totalCountResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    links: userLinks,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

export async function getLinkByShortCode(shortCode: string) {
  return db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);
}

export async function getLinkById(id: number) {
  return db.select().from(links).where(eq(links.id, id)).limit(1);
}
