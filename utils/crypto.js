/**
 * Crypto utilities for password hashing using Web Crypto API (SHA-256).
 * All functions are async since Web Crypto API is promise-based.
 */

/**
 * Hash a password using SHA-256 via the Web Crypto API.
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hex-encoded SHA-256 hash
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify a password against a stored hash.
 * @param {string} password - Plain text password to verify
 * @param {string} storedHash - Previously stored SHA-256 hash
 * @returns {Promise<boolean>} - True if password matches
 */
export async function verifyPassword(password, storedHash) {
  const hash = await hashPassword(password);
  return hash === storedHash;
}

/**
 * Generate a short hash (first 8 chars) of a string for use as storage key suffix.
 * @param {string} str - Input string (e.g. email)
 * @returns {Promise<string>} - 8-char hex hash
 */
export async function shortHash(str) {
  const full = await hashPassword(str.toLowerCase().trim());
  return full.substring(0, 8);
}

/**
 * Synchronous short hash using a simple djb2 algorithm.
 * Used where async is not possible (Redux reducers).
 * @param {string} str - Input string
 * @returns {string} - 8-char hex hash
 */
export function shortHashSync(str) {
  const s = str.toLowerCase().trim();
  let hash = 5381;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) + hash + s.charCodeAt(i)) & 0xffffffff;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
