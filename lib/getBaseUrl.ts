import { headers } from 'next/headers';

/**
 * Gets the base URL for API calls in server components.
 * Dynamically determines the URL based on the request headers in production,
 * or falls back to localhost in development.
 */
export async function getBaseUrl(): Promise<string> {
  // In production, use the environment variable if set
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Try to get the host from headers (works in server components)
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    
    if (host) {
      return `${protocol}://${host}`;
    }
  } catch {
    // Headers not available (e.g., during static generation)
  }

  // Fallback for development
  return 'http://localhost:3000';
}
