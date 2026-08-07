# Sahil Poojary — Personal Website

A premium personal website built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion — professional identity, career story, and creative portfolio in one site.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating your information

Almost everything lives in structured data files — no component code needs to change for content updates.

| What to edit | File |
| --- | --- |
| Name, email, LinkedIn, section on/off toggles | `src/config/profile.ts` |
| Work experience | `src/data/experience.ts` |
| Education | `src/data/education.ts` |
| Certifications | `src/data/certifications.ts` |
| Skills | `src/data/skills.ts` |
| Recommendations | `src/data/recommendations.ts` |
| Languages | `src/data/languages.ts` |
| Selected work / projects | `src/data/selectedWork.ts` |
| Beyond Work interests | `src/data/interests.ts` |
| Artwork | `src/data/art.ts` (+ images in `public/art/`) |

### Adding artwork

1. Drop the image file into `public/art/` (e.g. `public/art/new-piece.jpg`).
2. Add one entry to the `art` array in `src/data/art.ts`:

   ```ts
   {
     title: "New Piece",
     image: "/art/new-piece.jpg",
     category: "Sketches",
     date: "2026",
     description: "A short description.",
   }
   ```

The gallery, filters, and lightbox on `/art` and the homepage teaser update automatically.

### Adding a resume

Drop a PDF at `public/resume.pdf` and set `resume: true` under `sections` in `src/config/profile.ts`. The Resume section, and every Resume/Download button across the site, appear automatically — and stay hidden with no broken links if the file (or the toggle) is missing.

### Turning sections on/off

Edit the `sections` object in `src/config/profile.ts`:

```ts
sections: {
  hero: true,
  about: true,
  resume: false, // hidden until a resume.pdf is added
  // ...
}
```

## Ask Sahil (AI assistant)

Ask Sahil works out of the box with **zero cost and no API key** — it answers questions using direct, grounded retrieval over the structured data in `src/data/*` and `src/config/profile.ts` (see `src/lib/ask-sahil.ts`). It can never invent information: if the answer isn't in the data, it says so.

To upgrade to full natural-language answers from a real model, set `ANTHROPIC_API_KEY` (and optionally `ASK_SAHIL_MODEL`) as an environment variable — see `.env.example`. No frontend code changes are required, and the key is never exposed to the browser (it's only read in `src/app/api/ask/route.ts`, a server route).

## Deployment (Vercel — free)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in, and import the repository.
3. Framework preset auto-detects as Next.js — no configuration needed.
4. (Optional) Add environment variables from `.env.example` under Project Settings → Environment Variables.
5. Click **Deploy**. Your site will be live at `https://<project-name>.vercel.app` within a couple of minutes.

To add a custom domain later: Project Settings → Domains → Add, then follow Vercel's DNS instructions with your domain registrar.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation
- **lucide-react** for icons
