/**
  * Security utilities for the portfolio website
 * Implements protection against common web vulnerabilities
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - User input string to sanitize
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  // Basic HTML encoding to prevent script injection
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Creates a Content Security Policy header value
 * This helps prevent XSS attacks by restricting which resources can be loaded
 */
export function getCSPPolicy(): string {
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' https://images.unsplash.com data:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://hooks.jdoodle.net https://api.openai.com",
    "frame-src 'none'",
    "object-src 'none'"
  ].join('; ');
}

/**
 * Generates a random CSRF token
 * @returns Random token string
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates an email address format
 * @param email - Email to validate
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant regex pattern for email validation
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(email);
}

/**
 * Rate limiting utility to prevent brute force attacks
 */
export class RateLimiter {
  private attempts: Map<string, {count: number, timestamp: number}> = new Map();
  private maxAttempts: number;
  private timeWindow: number; // in milliseconds

  constructor(maxAttempts = 5, timeWindowInSeconds = 60) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindowInSeconds * 1000;
  }

  /**
   * Checks if a client has exceeded the rate limit
   * @param clientId - Unique identifier (IP, session ID, etc.)
   * @returns Boolean indicating if rate limit is exceeded
   */
  isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const clientData = this.attempts.get(clientId);
    
    // No previous attempts
    if (!clientData) {
      this.attempts.set(clientId, { count: 1, timestamp: now });
      return false;
    }
    
    // Reset counter if outside time window
    if (now - clientData.timestamp > this.timeWindow) {
      this.attempts.set(clientId, { count: 1, timestamp: now });
      return false;
    }
    
    // Increment counter
    const newCount = clientData.count + 1;
    this.attempts.set(clientId, { count: newCount, timestamp: clientData.timestamp });
    
    // Check if rate limited
    return newCount > this.maxAttempts;
  }

  /**
   * Reset rate limiting for a client
   * @param clientId - Unique identifier to reset
   */
  reset(clientId: string): void {
    this.attempts.delete(clientId);
  }
}

/**
 * Securely store sensitive data in memory
 * A more secure approach would use a dedicated vault service
 */
export class SecureStore {
  private static instance: SecureStore;
  private store: Map<string, string> = new Map();
  
  private constructor() {}
  
  public static getInstance(): SecureStore {
    if (!SecureStore.instance) {
      SecureStore.instance = new SecureStore();
    }
    return SecureStore.instance;
  }
  
  /**
   * Set a secure value
   * @param key - The key to store
   * @param value - The value to store
   */
  set(key: string, value: string): void {
    this.store.set(key, value);
  }
  
  /**
   * Get a secure value
   * @param key - The key to retrieve
   * @returns The stored value or undefined
   */
  get(key: string): string | undefined {
    return this.store.get(key);
  }
  
  /**
   * Delete a secure value
   * @param key - The key to delete
   */
  delete(key: string): void {
    this.store.delete(key);
  }
  
  /**
   * Clear all stored values
   */
  clear(): void {
    this.store.clear();
  }
}
 