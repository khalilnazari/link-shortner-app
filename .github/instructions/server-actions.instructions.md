---
description: Read this before creating or modifying server actions for data mutations.
---

# Server Actions Instructions

This document outlines the rules and best practices for implementing server actions in our Next.js application.

## Required Rules

- **All data mutations must use server actions:** Never mutate data directly from components or API routes.
- **Client component invocation:** Server actions must be called from client components only.
- **File naming:** Server action files MUST be named `actions.ts`.
- **Colocation:** Place `actions.ts` in the same directory as the component that calls it.

## Type Safety & Validation

- **TypeScript types required:** All data passed to server actions must have appropriate TypeScript types.
- **No FormData type:** Do NOT use the `FormData` TypeScript type. Define explicit typed objects instead.
- **Zod validation:** ALL input data MUST be validated using Zod schemas inside the server action.

## Authentication

- **Auth check first:** Every server action MUST verify the user is logged in before performing any database operations.
- **Use Clerk:** Leverage Clerk's server-side helpers to check authentication status.

## Database Operations

- **Use /data directory helpers:** Server actions must NOT directly use Drizzle queries.
- **Call helper functions:** Use the mutation/query functions from `/data` directory that wrap Drizzle operations.

## Error Handling

- **No throwing errors:** Server actions must NOT throw errors.
- **Return result objects:** Always return an object with either a `success` or `error` property.
- **Consistent structure:** Use a consistent return type like `{ success: true, data: ... }` or `{ error: "Error message" }`.

## Example Structure

```
app/
  dashboard/
    components/
      create-link-form.tsx    # Client component calling the action
      actions.ts              # Server actions for this feature
```

## Developer Checklist

- [ ] File is named `actions.ts` and colocated with calling component
- [ ] All parameters have explicit TypeScript types (no `FormData`)
- [ ] Input validated with Zod schema
- [ ] Authentication checked before database operations
- [ ] Database operations use `/data` directory helper functions

Last updated: January 1, 2026
