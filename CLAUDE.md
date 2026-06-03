# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # Next.js dev server on http://localhost:3000
npm run build    # production build (statically generates every product page)
npm run start    # serve the production build
npm run lint     # next lint
```

Data/asset pipeline scripts (run from repo root, both require `sharp` which is **not** in package.json — install it separately before running):

```bash
npm run scrape:weightworld   # scrape WeightWorld product pages -> JSON in src/data/
npm run images:immersive     # generate background-removed .webp packshots in public/products/immersive/
```

There is no test suite.

## Architecture

This is a **storefront-only Next.js 15 App Router** site (React 19, TypeScript strict, path alias `@/* -> src/*`) for a Lebanese wellness/supplements brand. It is bilingual (English + Arabic) and **has no backend, cart, database, or payment integration** — all ordering happens through prefilled WhatsApp deep links (`https://wa.me/96170000000?text=...`, a placeholder number). Keep this constraint in mind: "checkout" means generating a WhatsApp message, not server-side commerce.

### Data model — SKU is the join key

The catalog is **static, file-based data**, not a CMS. Three data sources are stitched together by SKU (e.g. `CC0224`):

1. **`src/data/products.ts`** — the hand-curated source of truth. Exports `products: Product[]`, plus derived `categories`/`formats` and helpers `getProductBySlug`, `getRelatedProducts`. Prices are intentionally `"TBA"` placeholders.
2. **`src/data/weightworld-scraped-*.json`** — scraped richer content (`descriptionText`, `nutrition` tables, `localImages`). The product detail page looks these up **by `sku`** to render the long-form sections, nutrition table, and gallery, falling back to the curated `Product` fields when absent.
3. **`src/data/merchandising.ts`** — `wellnessGoals` and `routineBundles`, each referencing products by **arrays of SKUs**. Helpers: `getGoalById`, `getGoalsForSku`. This drives the goal filter, routine bundles, and the "fits these routines" panel.

When adding or editing a product, the SKU must stay consistent across all three files or the joins silently fall back / drop content.

The catalog is **14 products** sourced from **WeightWorld UK** (`weightworld.uk`). The authoritative briefs live in `Information/*.md` (one per product, with the canonical `.uk` product-page URL). To refresh images/descriptions: ensure each `products.ts` `sourceUrl` points at the correct `.uk` handle, then run `npm run scrape:weightworld` (downloads hero + gallery images by array position, rebuilds the launch JSON) followed by `npm run images:immersive` (background-removes them and rewrites the JSON image paths). The scrape names hero files `NN-<sku>-<slug>.webp` by **array position**, so `products.ts` order, `number`, and `image` paths must stay in sync.

### Rendering flow

- **Server components by default.** Only `HeroMotion`, `Reveal`, `ProductFinder`, `ProductGallery`, and `ShopFilters` are `"use client"`.
- `src/app/product/[slug]/page.tsx` is statically generated via `generateStaticParams()` over `products`. It joins the curated product with the scraped JSON by SKU, then `splitProductContent()` **heuristically** parses the raw `descriptionText` into accordion sections (a line is treated as a heading if it ends in `?` or starts with keywords like "Benefits"/"How"/"Directions"). Expect imperfect parsing on messy scraped text.
- `ShopFilters` does **all filtering and sorting client-side** over the full `products` array (category, format, goal, search, best-sellers, sort). It reads initial `category`/`format`/`goal` from URL search params (`useSearchParams`), so links like `/shop?goal=beauty` deep-link into a filtered view — hence the page wraps it in `<Suspense>`.
- `src/app/layout.tsx` holds the global chrome: scrolling bilingual urgency banner, header/footer, and the floating WhatsApp bubble. Fonts (Playfair Display + Cairo for Arabic) load via Google Fonts `<link>` here.

### Styling

Single global stylesheet `src/app/globals.css` driven by CSS variables (`--green`, `--ink`, `--muted`, `--accent`). No CSS modules or Tailwind. Motion via Framer Motion with reduced-motion support.

## Context docs

`SAHHADAILY_COMPETITIVE_AUDIT.md` records the conversion/merchandising research that motivates features like the routine finder, wellness-goal filtering, and trust strips — consult it before reworking the shop/product UX. `README.md` lists pre-launch obligations (verify ingredient panels, claims, prices, tax). `Information/*.md` are the authoritative per-product briefs (names, dosages, ratings, key features) — treat them as the source of truth when reconciling product data.
