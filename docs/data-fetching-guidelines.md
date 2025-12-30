# Data Fetching & Database Query Guidelines

## Core Principles

1. **Server Components First** - Always fetch data in React Server Components
2. **Separation of Concerns** - Database queries must be isolated in dedicated data access functions
3. **No Inline Queries** - Never write database queries directly inside server components or server actions

## Directory Structure

```
/data                 # Data access layer (create this directory)
  /queries            # Database query functions organized by domain
    links.ts          # Link-related queries
    users.ts          # User-related queries
    analytics.ts      # Analytics queries
```

## Data Access Pattern

### ✅ Correct: Dedicated Query Functions

Create query functions in `/data/queries/`:

```typescript
// data/queries/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db.select().from(links).where(eq(links.userId, userId));
}

export async function getLinkByShortCode(shortCode: string) {
  return db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);
}

export async function getLinkById(id: string) {
  return db.select().from(links).where(eq(links.id, id)).limit(1);
}
```

### ✅ Correct: Server Component Usage

```typescript
// app/dashboard/page.tsx
import { getLinksByUserId } from "@/data/queries/links";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const links = await getLinksByUserId(userId);

  return <LinksList links={links} />;
}
```

### ❌ Incorrect: Inline Database Queries

```typescript
// DON'T DO THIS
export default async function DashboardPage() {
  const { userId } = await auth();

  // ❌ Never write queries directly in components
  const links = await db.select().from(links).where(eq(links.userId, userId));

  return <LinksList links={links} />;
}
```

## Server Actions Pattern

Server actions should call data access functions, not execute queries directly:

```typescript
// app/actions/links.ts
"use server";

import { createLink, deleteLink } from "@/data/mutations/links";
import { revalidatePath } from "next/cache";

export async function createLinkAction(formData: FormData) {
  const url = formData.get("url") as string;

  await createLink({ url, userId });
  revalidatePath("/dashboard");
}
```

## Mutations

For write operations, create mutation functions:

```typescript
// data/mutations/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(data: { url: string; userId: string }) {
  return db.insert(links).values(data).returning();
}

export async function deleteLinkById(id: string) {
  return db.delete(links).where(eq(links.id, id));
}
```

## Naming Conventions

| Type         | Prefix   | Example              |
| ------------ | -------- | -------------------- |
| Get single   | `get`    | `getLinkById()`      |
| Get multiple | `get`    | `getLinksByUserId()` |
| Create       | `create` | `createLink()`       |
| Update       | `update` | `updateLink()`       |
| Delete       | `delete` | `deleteLinkById()`   |

## Benefits

- **Testability** - Query functions can be easily unit tested
- **Reusability** - Same queries can be used across multiple components
- **Maintainability** - Database logic changes in one place
- **Type Safety** - Centralized return types for queries
- **Caching** - Easier to implement caching strategies

---

**Last Updated:** December 31, 2025
