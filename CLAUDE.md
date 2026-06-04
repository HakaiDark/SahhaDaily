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
- `src/app/layout.tsx` holds the global chrome: scrolling bilingual urgency banner, header/footer, the floating WhatsApp bubble, and the fixed `.atmosphere` decoration layer (first child of `<body>`). Fonts (Cairo + Tajawal) load via Google Fonts `<link>` here — note the codebase uses Cairo/Tajawal throughout, **not** the Playfair Display the brand board specifies.

### Styling

Single global stylesheet `src/app/globals.css` driven by CSS variables (`--green`, `--deep-green`, `--sage`, `--beige`, `--ink`, `--muted`, `--accent`, etc. — see `:root`). No CSS modules or Tailwind. Motion via Framer Motion (`Reveal`, `HeroMotion`) plus a few CSS keyframes, all gated behind `prefers-reduced-motion`.

Two-tone wordmark convention: the "Sahha"/"صحة" half is green (`--green`), the "Daily"/"دايلي" half is orange (`--accent`). This split is applied by wrapping the accent half in a `<span>` and is reused in the header/footer logo (`.brandLatin`/`.brandArabic`), the hero `.eyebrow`, and `.arabicTag .o`.

### Botanical decoration layer

`src/components/Botanical.tsx` (a server component) exports **file-free inline-SVG** nature ornaments: `Fern`, `Vine`, `Sprig`, `OliveBranch`, `Leaf`, `Cedar` (Lebanon cedar), `CedarRidge` (a treeline), and `BotanicalDivider`. They render zero client JS and ship no image files.

- All shapes draw with `currentColor`, so **tint and opacity are controlled entirely from CSS** placement classes (`.heroFern`, `.heroCedar`, `.panelVine`, `.panelCedar`, `.footerRidge`, `.footerVine`, etc.) under the `/* BOTANICAL ATMOSPHERE LAYER */` block at the end of `globals.css`. To tune strength, change opacity/color there — don't touch the components.
- Every decoration is `aria-hidden` + `pointer-events:none` and sits **behind** content (the `.atmosphere` grain/sunlight layer is fixed at `z-index:-1`; per-section accents use `z-index:0` with content lifted to `z-index:1`).
- Gentle float motion comes from the `.botanicalFloat` class → `@keyframes botanicalDrift`, which animates the **independent `translate` property** (not `transform`) so each element's static `transform: rotate()/scaleX()` composes with the drift instead of being overwritten. Disabled under `prefers-reduced-motion`.
- The `Cedar`/`CedarRidge`/divider all share one private `CedarGlyph` drawn in base-origin coords (base at `0,0`, growing up) so a single tree, a treeline, and the divider mark stay visually identical.

As of the latest pass this layer is applied to the **homepage + global footer only**; the shop and product-detail pages have not yet received it.

## Context docs

`SAHHADAILY_COMPETITIVE_AUDIT.md` records the conversion/merchandising research that motivates features like the routine finder, wellness-goal filtering, and trust strips — consult it before reworking the shop/product UX. `README.md` lists pre-launch obligations (verify ingredient panels, claims, prices, tax). `Information/*.md` are the authoritative per-product briefs (names, dosages, ratings, key features) — treat them as the source of truth when reconciling product data.
