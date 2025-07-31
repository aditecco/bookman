/**
 * Advanced HTML Sanitization using DOMPurify
 * Handles both client-side and server-side rendering
 */

// DOMPurify configuration for maximum security
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [], // No HTML tags allowed
  ALLOWED_ATTR: [], // No attributes allowed
  KEEP_CONTENT: true, // Keep text content
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  USE_PROFILES: { html: false, svg: false, svgFilters: false, mathMl: false },
};

/**
 * Sanitizes HTML content using DOMPurify
 * @param content - The content to sanitize
 * @returns Sanitized content
 */
export function sanitizeHtml(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }

  // Client-side: Use DOMPurify
  if (typeof window !== 'undefined') {
    try {
      const DOMPurify = require('dompurify');
      return DOMPurify.sanitize(content, DOMPURIFY_CONFIG);
    } catch (error) {
      // Fallback if DOMPurify fails to load
      console.warn('DOMPurify failed to load, using fallback sanitization');
      return fallbackSanitize(content);
    }
  }

  // Server-side: Use fallback sanitization
  return fallbackSanitize(content);
}

/**
 * Fallback sanitization for server-side rendering
 * @param content - The content to sanitize
 * @returns Sanitized content
 */
function fallbackSanitize(content: string): string {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<input\b[^<]*(?:(?!\/>)<[^<]*)*\/?>/gi, '')
    .replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '')
    .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '')
    .replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Sanitizes user input for safe display
 * @param input - The user input to sanitize
 * @returns Sanitized input
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return sanitizeHtml(input.trim());
}

/**
 * Sanitizes URL for safe use
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const sanitized = sanitizeHtml(url.trim());
  
  // Additional URL-specific sanitization
  return sanitized
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '');
}

/**
 * Sanitizes tag names for safe use
 * @param tag - The tag name to sanitize
 * @returns Sanitized tag name
 */
export function sanitizeTag(tag: string): string {
  if (!tag || typeof tag !== 'string') {
    return '';
  }

  return sanitizeHtml(tag.trim().toLowerCase())
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
} 