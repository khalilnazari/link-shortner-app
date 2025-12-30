import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Links table - stores shortened URLs
export const links = pgTable(
  "links",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    shortCode: varchar("short_code", { length: 20 }).notNull().unique(),
    originalUrl: text("original_url").notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID
    title: varchar("title", { length: 255 }), // Optional custom title
    clicks: integer("clicks").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("short_code_idx").on(table.shortCode),
    index("user_id_idx").on(table.userId),
  ]
);

// Link clicks table - detailed analytics for each click
export const linkClicks = pgTable(
  "link_clicks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    linkId: integer("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    clickedAt: timestamp("clicked_at").defaultNow().notNull(),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    ipHash: varchar("ip_hash", { length: 64 }), // SHA-256 hash for privacy
    country: varchar("country", { length: 100 }),
    city: varchar("city", { length: 100 }),
  },
  (table) => [
    index("link_id_idx").on(table.linkId),
    index("clicked_at_idx").on(table.clickedAt),
  ]
);

// Define relations between tables
export const linksRelations = relations(links, ({ many }) => ({
  clicks: many(linkClicks),
}));

export const linkClicksRelations = relations(linkClicks, ({ one }) => ({
  link: one(links, {
    fields: [linkClicks.linkId],
    references: [links.id],
  }),
}));

// TypeScript types for type-safe queries
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
export type LinkClick = typeof linkClicks.$inferSelect;
export type NewLinkClick = typeof linkClicks.$inferInsert;
