# Agent Instructions - Link Shortener App

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

2. **FIRST:** Understand the existing patterns in similar files
3. **SECOND:** Ensure changes align with project standards
4. **THIRD:** Test thoroughly before committing

**Remember:** The `/docs` directory contains authoritative guidance. When in doubt, CHECK THE DOCS!

## File Organization

```
/app              # Next.js App Router pages and layouts
/components       # React components
  /ui             # shadcn/ui components
/data             # Data access layer
  /queries        # Database query functions
  /mutations      # Database mutation functions
/db               # Database schema and migrations
/lib              # Shared utilities and helpers
/hooks            # Custom React hooks
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

- Always use React Server Components by default
- Mark components with `"use client"` only when necessary
- Use Drizzle ORM for all database operations
- **NEVER write database queries inside server components or actions** - Use `/data` directory functions
- Maintain consistent TypeScript strict mode compliance
- Use Tailwind CSS utility classes for styling

---

**Last Updated:** December 31, 2025
