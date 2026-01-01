---
description: Read this before implementing or modifying authenticationin the project.
---

## Required Rules

- **Only use Clerk:** All authentication must be handled by Clerk. Do not add or use any other auth methods.
- **Protected dashboard:** The `/dashboard` route must require an authenticated user; unauthenticated requests should be redirected to sign-in.
- **Homepage redirect for signed-in users:** If an authenticated user visits `/` (homepage), redirect them to `/dashboard`.
- **Modal sign-in / sign-up:** Always launch Clerk sign-in and sign-up flows as a modal (never full-page redirects by default).

## Implementation Notes

- Use Clerk React/Next.js integration and server-side helpers for guarding server components and routes.
- Prefer server-side checks where possible (middleware or server components) to prevent flashing protected content.
- Keep UI triggers for sign-in/sign-up consistent: open the Clerk modal component from client components.

## Developer Checklist

- Add or update server-side protection for `/dashboard` and middleware redirect rules as needed.
- Ensure homepage redirects on server when session indicates a signed-in user.
- Verify sign-in/up flows open as modals in both desktop and mobile layouts.

Last updated: December 29, 2025
