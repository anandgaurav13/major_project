/**
 * Browser Google Maps key. Next only injects env from .env / .env.local (not .env.example).
 * See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
 */
export function getGoogleMapsBrowserKey(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ??
    process.env.GOOGLE_MAPS_API_KEY;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}
