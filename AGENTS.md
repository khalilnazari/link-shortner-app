# Agent Instructions - Link Shortener App

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST ⚠️

**BEFORE GENERATING ANY CODE, YOU MUST:**

1. **READ the relevant documentation files in `/docs` directory**
2. **UNDERSTAND the existing patterns and conventions**
3. **FOLLOW the established guidelines precisely**

This is **NOT OPTIONAL**. Failure to consult the documentation will result in code that doesn't follow project standards and will need to be rewritten.

---

This file serves as the main entry point for AI coding assistants working on this project. All coding standards, conventions, and best practices are documented in separate files within the `/docs` directory.

## Required Documentation Files

**Authentication & User Management:**

- [docs/auth-clerk-guidelines.md](docs/auth-clerk-guidelines.md) - Clerk authentication patterns, components, and best practices

**UI Components & Styling:**

- [docs/ui-shadcn-guidelines.md](docs/ui-shadcn-guidelines.md) - shadcn/ui component usage, theming, and design patterns

**ALWAYS consult the relevant documentation file BEFORE writing any code in these areas.**

## Project Overview

**Project Type:** Link Shortener Application  
**Framework:** Next.js 16.1.1 (App Router)  
**Language:** TypeScript 5  
**Package Manager:** pnpm  
**Database:** PostgreSQL with Neon  
**ORM:** Drizzle ORM  
**Authentication:** Clerk  
**UI Library:** shadcn/ui with Tailwind CSS 4  
**Icon Library:** Lucide React

## Core Principles

1. **Type Safety First** - Leverage TypeScript's strict mode for maximum type safety
2. **Server-First Architecture** - Prefer React Server Components and server actions
3. **Performance Optimized** - Use Next.js features like streaming and suspense
4. **Consistent Patterns** - Follow established conventions across the codebase
5. **Developer Experience** - Write self-documenting code with clear intent

## Getting Started

**MANDATORY STEPS before making ANY changes:**

1. **FIRST:** Read the relevant documentation files in `/docs` directory
2. **SECOND:** Understand the existing patterns in similar files
3. **THIRD:** Ensure changes align with project standards
4. **FOURTH:** Test thoroughly before committing

**Remember:** The `/docs` directory contains authoritative guidance. When in doubt, CHECK THE DOCS!

## File Organization

```
/app              # Next.js App Router pages and layouts
/components       # React components
  /ui             # shadcn/ui components
/db               # Database schema and migrations
/lib              # Shared utilities and helpers
/hooks            # Custom React hooks
/docs             # Agent instructions and standards
/public           # Static assets
```

## Path Aliases

Use the `@/` prefix for imports:

```typescript
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { cn } from "@/lib/utils";
```

## Environment Variables

Required environment variables:

- `DATABASE_URL` - Neon PostgreSQL connection string
- Clerk authentication variables (see Clerk dashboard)

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Important Notes

- **ALWAYS consult `/docs` before writing code** - This cannot be emphasized enough
- Always use React Server Components by default
- Mark components with `"use client"` only when necessary
- Use Drizzle ORM for all database operations
- Follow the shadcn/ui component patterns (see [docs/ui-shadcn-guidelines.md](docs/ui-shadcn-guidelines.md))
- Follow Clerk authentication patterns (see [docs/auth-clerk-guidelines.md](docs/auth-clerk-guidelines.md))
- Maintain consistent TypeScript strict mode compliance
- Use Tailwind CSS utility classes for styling

---

**Last Updated:** December 29, 2025  
**For detailed standards, refer to the individual documentation files in `/docs`**

## Documentation Index

- **Authentication:** [docs/auth-clerk-guidelines.md](docs/auth-clerk-guidelines.md)
- **UI Components:** [docs/ui-shadcn-guidelines.md](docs/ui-shadcn-guidelines.md)
