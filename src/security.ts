/**
 * Security Configuration
 * Centralized security settings for the application
 */

export const SECURITY_CONFIG = {
  // URL validation settings
  URL_VALIDATION: {
    ALLOWED_PROTOCOLS: ["http:", "https:"],
    MAX_URL_LENGTH: 2048,
    MIN_URL_LENGTH: 10,
  },

  // Input sanitization settings
  INPUT_SANITIZATION: {
    MAX_TAG_LENGTH: 50,
    MAX_TITLE_LENGTH: 500,
    MAX_DESCRIPTION_LENGTH: 2000,
    ALLOWED_HTML_TAGS: [], // No HTML allowed
  },

  // Authentication settings
  AUTH: {
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  },

  // Rate limiting settings
  RATE_LIMITING: {
    MAX_REQUESTS_PER_MINUTE: 60,
    MAX_REQUESTS_PER_HOUR: 1000,
  },

  // Content Security Policy
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
    IMG_SRC: ["'self'", "data:", "https:"],
    FONT_SRC: ["'self'", "data:"],
    CONNECT_SRC: ["'self'", "https://*.supabase.co"],
  },
};

/**
 * Security utility functions
 */
export const SECURITY_UTILS = {
  /**
   * Validates input length
   */
  validateLength: (input: string, maxLength: number): boolean => {
    return input.length <= maxLength;
  },

  /**
   * Validates email format
   */
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Generates a secure random string
   */
  generateSecureId: (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  },
};

// Import sanitization functions from utils
export {
  sanitizeHtml,
  sanitizeUserInput,
  sanitizeUrl,
  sanitizeTag,
} from "./utils/sanitizer";
