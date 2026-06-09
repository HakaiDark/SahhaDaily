# Premium Redesign — Change Log

**Branch:** `premium-redsign`
**Date:** 2026-06-09

Summary of all changes made during the premium-redesign pass. Build passes clean
(`npm run build`, no type/lint errors). `/product/[slug]` is server-rendered on
demand (`ƒ`) — `generateStaticParams` was already absent before this work.

---

## Files changed

- `src/components/Marquee.tsx` — **new**
- `src/components/ProductGallery.tsx` — **new**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/Hero.tsx`
- `src/components/ProductCard.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/ProductTabs.tsx`
- `src/app/product/[slug]/page.tsx`
- `src/app/shop/page.tsx`
- `src/app/globals.css`

---

## The 13 requested changes

1. **Marquee moved under the Coming Soon bar.** Extracted the white scrolling strip
   into `src/components/Marquee.tsx`; now rendered in `layout.tsx` between
   `<ComingSoon/>` and `<SiteHeader/>`, so it appears site-wide directly under the
   announcement bar. Removed the inline definition + usage from `page.tsx`.
2. **Header logo +10%.** `.brand-img` 64px → 70px; `.hdr.scrolled .brand-img` 54px → 59px.
3. **No movement on hover.** Removed the positional `transform` (translate/scale) from
   `.catg-card:hover`, `.bcard:hover`, `.excard:hover`, `.pcard:hover .pcard-media img`,
   plus the duplicate override rules (`.pcard:hover .pcard-media`, the second
   `.excard:hover`). Kept all shadow/colour changes and the `.btn` fill-sweep intact.
4. **Footer "Get in touch" — two locations.** Replaced the "Fast replies" row with two
   `PinIcon` location rows: **Al Qaraoun** (West Bekaa, Lebanon) and **Taalabaya**
   (Bekaa, Lebanon). Dropped the now-unused `ChatIcon` import.
5. **"Who we are" heading centered.** The kicker uses `kicker center` and sits centered
   above the heading (scoped CSS `.whoweare-copy .kicker.center { display:flex;
   justify-content:center }` so the inline-flex kicker actually centers in the column).
   The original two-column image + copy grid is otherwise unchanged.
6. **Best Seller / Popular badge under the stars.** Moved the label out of `.pcard-media`
   to render after the `.rrow` in `.pcard-body` as `tag inline`; added
   `.tag.inline { position: static; align-self: flex-start; ... }`.
7. **Removed product-page trust badges.** Deleted the `TRUST` constant and the
   `.pdx-trust` block (and its CSS).
8. **Removed the duplicate Benefits tab.** Kept the `.pdx-benefits` chips above the order
   button; removed the `["benefits","Benefits"]` tab + pane from `ProductTabs`; default
   tab changed from `benefits` → `how`.
9. **Shop heading — English only, two-tone.** Kicker is now
   `Product <span class="o">catalog</span>` (Arabic dropped); added `.kicker .o { color: var(--accent) }`.
10. **Hero headline** changed to **"Premium Wellness Supplements"** (last word in the
    accent-italic serif via `<span class="it">` to keep the two-tone design language).
11. **Hero copy order** (final, per follow-up): headline → separator → Arabic line
    `صحتك بالديني` → tagline `Daily support, better you 🌿` → lead → CTAs.
12. **Sage separator under the headline.** Added `<span class="hx-sep">` +
    `.hx-sep { width:64px; height:3px; border-radius:999px; background:var(--sage); margin:20px 0 }`.
    The `.hx-tagline` ("Daily support, better you 🌿") uses the serif display font with a
    two-tone split — "Daily support," in `--green`, "better you" in accent italic
    (`.hx-tagline .it`) — matching the headline's style.
13. **Hero cycles all products** (`slides = products.slice(0, 10)`) and the **multi-image
    product gallery was restored** (new `ProductGallery`) — see Gallery section below.

## Follow-up refinements

- **Who we are:** reverted an over-eager full restructure; only the kicker is centered now.
- **Hero:** Arabic + tagline placed *under* the green separator; headline restored to a
  two-tone serif look.
- **Botanical decorations removed** from `Hero.tsx` (Vine/Frond) and `SiteFooter.tsx`
  (Frond/Olive) and their imports. (`Botanical.tsx` still exports the components, unused.)
- **Shop hero spacing fix:** the Arabic line `مكمّلات أصلية من أوروبا` was crowding the
  big `.display` headline (tight `line-height: 0.92`, collapsing margins). Fixed with
  `.shop-hero-ar { margin-top: clamp(18px, 3.4vw, 48px) }` and `.shop-hero .display { margin-bottom: 0 }`.

## Product gallery (Hybrid)

`src/app/product/[slug]/page.tsx` resolves images at build time from
`public/products/gallery/<sku-lowercase>/` via `fs.readdirSync` (the old scraped
`localImages` JSON no longer exists). It leads with the background-removed immersive
packshot (`product.image`) and **drops the first raw gallery file** (`NN/01`) because it
is the same front-of-pack shot as the packshot (was showing as a duplicate).

`ProductGallery` renders adaptively per image:

- **Cut-out packshot** (path contains `/immersive/`) → `.pdx-media.is-cutout`: floats on
  the brand green-gradient frame, contained ~80%, soft drop-shadow.
- **Lifestyle / info creatives** (the `/gallery/` files) → `.pdx-media.is-scene`:
  full-bleed `object-fit: cover` filling the rounded frame edge-to-edge (no white box,
  no sharp edges).
- Thumbnails mirror this (`.pdx-thumb.is-cutout` contained on mint, `.is-scene` full-bleed
  cover); all rounded. Framer-motion crossfade on swap.

> ⚠️ **Open content note:** the `/gallery/` images are WeightWorld's own marketing
> creatives — they carry visible **"WeightWorld" branding and English marketing
> text/infographics** (e.g. a "WeightWorld vs Other Brands" comparison chart). Authentic
> to the "sourced from WeightWorld UK" story, but may want curating before launch.

## Dev / build note

Running `npm run build` (production `.next`) and then `npm run dev` over the same
`.next` causes an `ENOENT .next/server/app/.../page.js` overlay. Fix: stop the dev
server, `rm -rf .next`, then `npm run dev`. The build output left after this work was
cleaned, so `npm run dev` rebuilds fresh.
