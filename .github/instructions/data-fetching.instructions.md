---
description: Read this file to understand how to fetch data for the project.
---

# Data Fetching Instructions

This documents outlines the methods and best practices for fetching data in out Next.js application. Adhering to these guidelines will ensure consistency, performance, maintainability, and optimal performance across the project.

## 1. Use server-side data fetching

ALWAYS user server components for data fetching. NEVER use client components for data fetching unless absolutely necessary. Server components allow for better performance and SEO.

## 2. Fetching Data Methods

ALWAYS use /data directory for to fetch data. NEVER use server components or API routes for data fetching.

ALL hellper functions in /data directory should use Drizzle ORM for database interactions.
