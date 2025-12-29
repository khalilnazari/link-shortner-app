# Agent Instructions - Link Shortener App

This file serves as the main entry point for AI coding assistants working on this project. All coding standards, conventions, and best practices are documented in separate files within the `/docs` directory. ALWAYS refer to the relevant .md files before generating any code:

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

Before making changes:

1. Review the relevant documentation files in `/docs`
2. Understand the existing patterns in similar files
3. Ensure changes align with project standards
4. Test thoroughly before committing

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

- Always use React Server Components by default
- Mark components with `"use client"` only when necessary
- Use Drizzle ORM for all database operations
- Follow the shadcn/ui component patterns
- Maintain consistent TypeScript strict mode compliance
- Use Tailwind CSS utility classes for styling

---

**Last Updated:** December 29, 2025  
**For detailed standards, refer to the individual documentation files in `/docs`**

Agent-specific guidance: [docs/auth-clerk-guidelines.md](docs/auth-clerk-guidelines.md)

UI guidelines: [docs/ui-shadcn-guidelines.md](docs/ui-shadcn-guidelines.md)
