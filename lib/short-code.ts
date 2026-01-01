import { customAlphabet } from "nanoid";

// URL-friendly alphabet (alphanumeric only, no ambiguous characters)
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Pre-configured generator for default length (7 characters)
const generateCode = customAlphabet(alphabet, 7);

/**
 * Generates a random alphanumeric short code for URL shortening.
 * Uses nanoid for cryptographically secure random generation.
 *
 * @param length - Length of the short code (default: 7)
 * @returns A random alphanumeric string
 */
export function generateShortCode(length: number = 7): string {
  if (length === 7) {
    return generateCode();
  }
  // For custom lengths, create a new generator
  return customAlphabet(alphabet, length)();
}

/**
 * Validates that a short code contains only valid characters.
 *
 * @param code - The short code to validate
 * @returns True if valid, false otherwise
 */
export function isValidShortCode(code: string): boolean {
  return /^[A-Za-z0-9]+$/.test(code) && code.length >= 4 && code.length <= 20;
}
