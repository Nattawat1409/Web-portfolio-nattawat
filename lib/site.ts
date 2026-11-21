// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically at build time.
// For a custom domain, set NEXT_PUBLIC_SITE_URL (e.g. https://nattawat.dev) in Vercel env vars.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
