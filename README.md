# VisibleAid

Static marketing site for VisibleAid — built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

## Project structure

```text
/
├── mockup/                      original static HTML/CSS mockup (reference only, not built)
├── public/                      favicon etc.
├── src/
│   ├── data/facilities.ts       facility records — edit this to add/change facilities
│   ├── layouts/Layout.astro     shared nav + footer
│   ├── styles/global.css        design tokens, fonts, all page styling
│   └── pages/
│       ├── index.astro          home
│       ├── types.astro          facility types
│       ├── facilities.astro     all-facilities table
│       ├── monitor.astro        "monitor your donations" comparison page
│       └── facilities/[slug].astro   one page per facility, generated from data/facilities.ts
└── package.json
```

The `/mockup` folder is the original hand-built HTML/CSS design reference — it isn't part of the Astro build (Astro only builds files under `src/pages/`) and can be deleted once you're happy with the ported site, or kept around for reference.

## Adding or editing a facility

Everything about a facility — its stats, construction progress steps, and donor wall — lives in one place: [src/data/facilities.ts](src/data/facilities.ts). Add an object to the array and a new page at `/facilities/<slug>` is generated automatically at build time. No need to touch any `.astro` page.

## Replacing placeholder images

Placeholders are the dashed `.ph` boxes styled in `global.css`. To swap one for a real photo, replace the `<div class="ph">...</div>` with an `<img>` (or use Astro's built-in [`<Image />`](https://docs.astro.build/en/guides/images/) component for automatic optimization) and drop the source file in `public/` or `src/assets/`.

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the production build locally          |
| `npx astro check`   | Type-check `.astro` files                     |

## Deploying to Vercel

This is a plain static Astro site — no adapter needed.

1. Push this repo to GitHub.
2. In Vercel, "Add New Project" → import the repo. Vercel auto-detects Astro and uses `npm run build` / output directory `dist` — no config required.
3. Every push to `main` deploys to production; every PR gets a preview URL.
