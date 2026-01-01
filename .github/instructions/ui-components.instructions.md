---
description: Read this before building or modifying UI components in this project.
---

## Core Rule

- **Always use shadcn/ui:** Do not create custom UI components. Use the existing shadcn/ui components and patterns for all UI elements.

## When You Need New UI

- Prefer composing or extending existing shadcn components via props and variants.
- If a required component is missing, open a short PR adding a small, well-named component under `/components/ui` using shadcn patterns — keep it consistent.

## Styling

- Use Tailwind utility classes and shadcn variants for styling. Avoid ad-hoc CSS files or bespoke class naming.

## Client vs Server

- Mark a component with `"use client"` only when it needs client-side interactivity (modals, buttons that open Clerk modal, etc.).

## Accessibility & Consistency

- Use accessible primitives from shadcn and follow existing spacing/typography tokens.
- Keep interaction patterns (modals, toasts, forms) consistent across the app.

## Checklist Before Commit

- Confirm you used shadcn components (no custom UI files).
- Ensure styles follow Tailwind + shadcn conventions.
- Run lint and verify no new UI-related design tokens were introduced without docs.

Last updated: December 29, 2025
