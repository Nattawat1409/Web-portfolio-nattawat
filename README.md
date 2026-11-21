# Web-portfolio-nattawat

Personal portfolio of **Nattawat Ruensumrit**, AI Engineer & Software Engineer.
Built with Next.js 16 (App Router), Tailwind CSS v4, Motion, Lucide and Resend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (same as Vercel)
```

## Where to edit things

| What | Where |
| --- | --- |
| **All text content** (experience, awards, skills, certificates, links) | `lib/data.ts` |
| Event photos: Cyber Warrior Hackathon 2025 | `public/events/cyber-warrior-2025/` |
| Event photos: E-SAN PMU-B Coding & AI Academy S2 | `public/events/esan-pmub-s2/` |
| Downloadable CV | `public/Resume_Nattawat_Ruensumrit.pdf` |
| Colors / fonts | `app/globals.css` (`@theme` block) |

### Adding event photos

Drop `.jpg` / `.png` / `.webp` / `.avif` files into an event folder. They are picked up automatically at build time. No code changes needed.

- Photos are sorted by file name, so name them `01.jpg`, `02.jpg`, …
- **`01` is shown large**, so use your best shot (e.g. the award moment).
- The first 3 photos show in the grid; the rest open in the lightbox via the "+N" tile.
- Keep each photo under ~2 MB (Next.js serves optimized AVIF/WebP automatically).

## Deploy on Vercel

1. Push this repo to GitHub.
2. Vercel → **Add New Project** → import the repo. The defaults are correct (framework: Next.js).
3. Set up the contact form (optional but recommended):
   1. Create a free account at [resend.com](https://resend.com) **using `nattawat140947@gmail.com`**.
      The default sender `onboarding@resend.dev` can only deliver to the email you signed up with.
   2. Resend → API Keys → create a key.
   3. Vercel → Project → Settings → Environment Variables → add `RESEND_API_KEY`.
   4. Redeploy.
4. (Optional) Using a custom domain? Add `NEXT_PUBLIC_SITE_URL=https://your-domain` so social previews and the sitemap use it.

Without `RESEND_API_KEY` the site still works. The form shows a friendly error with an "Email instead" button.
See `.env.example` for every variable.

## Structure

```
app/
  layout.tsx            fonts, SEO metadata, JSON-LD
  page.tsx              section order
  api/contact/route.ts  contact form → Resend (validation, honeypot, rate limit)
  opengraph-image.tsx   social share card
components/             Navbar, Hero, About, Experience, Hackathons, EventGallery,
                        TechStack, Certificates, Contact, Footer, ui/*
lib/
  data.ts               all content
  photos.ts             reads event photo folders at build time
```
