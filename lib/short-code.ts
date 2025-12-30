/**
 * Generates a random alphanumeric short code for URL shortening.
 * Uses a cryptographically secure random generator when available.
 *
 * @param length - Length of the short code (default: 7)
 * @returns A random alphanumeric string
 */
export function generateShortCode(length: number = 7): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsetLength = charset.length;

  // Use crypto.getRandomValues for secure random generation
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charsetLength];
  }

  return result;
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
