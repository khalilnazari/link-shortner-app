/**
 * Verification script to test the database schema
 * Run with: pnpm tsx scripts/verify-schema.ts
 */
import "dotenv/config";
import db from "../db";
import { links, linkClicks } from "../db/schema";
import { generateShortCode } from "../lib/short-code";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🔍 Verifying database schema...\n");

  // Generate a test short code
  const shortCode = generateShortCode();
  console.log(`Generated short code: ${shortCode}`);

  // Test insert into links table
  console.log("\n📝 Inserting test link...");
  const [newLink] = await db
    .insert(links)
    .values({
      shortCode,
      originalUrl: "https://example.com/test-verification",
      userId: "test_user_123",
      title: "Test Link",
    })
    .returning();

  console.log("✅ Link created:", newLink);

  // Test insert into link_clicks table
  console.log("\n📝 Inserting test click...");
  const [newClick] = await db
    .insert(linkClicks)
    .values({
      linkId: newLink.id,
      userAgent: "Mozilla/5.0 (Test)",
      referrer: "https://google.com",
      ipHash: "a1b2c3d4e5f6...",
      country: "US",
      city: "New York",
    })
    .returning();

  console.log("✅ Click recorded:", newClick);

  // Test select with relation
  console.log("\n🔍 Querying link with clicks...");
  const linkWithClicks = await db.query.links.findFirst({
    where: eq(links.id, newLink.id),
    with: {
      clicks: true,
    },
  });

  console.log("✅ Link with clicks:", linkWithClicks);

  // Clean up - hard delete test data
  console.log("\n🧹 Cleaning up test data...");
  await db.delete(links).where(eq(links.id, newLink.id));
  console.log("✅ Test data deleted (cascade deleted clicks too)");

  console.log("\n✨ Schema verification complete! All operations successful.");
}

main().catch((error) => {
  console.error("❌ Verification failed:", error);
  process.exit(1);
});
