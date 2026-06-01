# SahhaDaily Competitive Growth Audit

Date: 2026-06-01

## Research Sources Reviewed

- Baymard Vitamins & Supplements UX benchmark: https://baymard.com/research/vitamins-supplements
- Vitamin Shoppe category and supplement merchandising patterns: https://www.vitaminshoppe.com/
- Holland & Barrett product-page structure examples: https://www.hollandandbarrett.com/shop/product/health-him-male-fertility-60-capsules-6100009550
- Octane AI supplement quiz patterns and case studies: https://www.octaneai.com/solutions/supplements
- Heyflow supplement quiz funnel examples: https://heyflow.com/blog/4-high-converting-supplement-quiz-funnel-examples/

## What Top Supplement Shops Do Well

1. Guided selling
   - They reduce overwhelm with product quizzes, wellness goals, routine finders, and bundle recommendations.

2. Routine merchandising
   - They sell stacks, category-led packs instead of isolated products only.

3. Trust above the fold
   - They surface source, reviews, verification, delivery, usage clarity, and product details close to the buy action.

4. Strong filtering
   - Filters go beyond category and format: goal, gender, life stage, form, rating, best sellers, stock, price-per-serving, and delivery availability.

5. Product-page clarity
   - Strong pages make dose, format, serving, ingredients, usage, reviews, and safety easy to scan.

6. Sticky conversion
   - Product pages keep add-to-cart/order actions available as shoppers scroll.

7. Social proof and merchandising labels
   - Best seller, popular, new, low stock, review counts, and sold-count framing help shoppers decide faster.

8. Support-led buying
   - Supplement shoppers often want reassurance, so chat/WhatsApp support is a major conversion tool.

## Implemented In This Pass

### Guided Product Finder

Files:

- src/components/ProductFinder.tsx
- src/data/merchandising.ts

Added a wellness-goal routine finder with goals such as:

- Daily energy and foundations
- Immune support
- Beauty, hair and skin
- Calm, focus and evening reset
- Bones, joints and active living
- Family gummies

The finder recommends matching products and links into the shop with goal and format filters applied.

### Curated Routine Bundles

Files:

- src/components/RoutineBundles.tsx
- src/data/merchandising.ts

Added bundle merchandising inspired by top supplement retailers:

- Daily Core Stack
- Beauty Glow Routine
- Active Mobility Pack

Each bundle includes product links and a prefilled WhatsApp order message.

### Stronger Shop Filtering

File:

- src/components/ShopFilters.tsx

Added:

- Goal quick chips
- Best sellers / popular toggle
- Search across product, SKU, benefit, and goal
- Sort by featured, rating, review count, stock, and name
- URL support for goal and format from the product finder

### Product Page Trust And Conversion

File:

- src/app/product/[slug]/page.tsx

Added:

- Reusable WhatsApp order link
- Purchase panel above the fold
- Trust cards: verified original, label-first guidance, WhatsApp support
- Sticky order bar while scrolling
- Quick spec card with format, stock, rating, and routine fit
- Routine fit card showing which wellness goals the product belongs to

### Styling Layer

File:

- src/app/globals.css

Added styling for:

- Finder section
- Bundle cards
- Goal chips
- Best-seller toggle
- Purchase panel
- Product confidence grid
- Sticky order bar
- Product spec cards
- Routine fit cards

## Still Worth Adding Later

1. Final prices and price-per-serving
   - Dummy prices are in place now; replace with confirmed Lebanon pricing when ready.

2. Real customer reviews
   - Current ratings exist in product data, but real review content/testimonials would be stronger.

3. Actual cart or order queue
   - Current conversion is WhatsApp-first. A lightweight cart could send grouped WhatsApp orders.

5. Product comparison table
   - Especially useful for multivitamins, gummies, magnesium, and immunity products.

6. Lab/COA or authenticity proof page
   - If available from supplier/import process, this would materially improve trust.

7. Bilingual expansion
   - Shop hero is bilingual, but filters/product details are still mostly English.

8. Lifecycle categories
   - Men, women, kids, active adults, beauty, immunity, stress/sleep, family packs.

9. Delivery promise details
   - Add delivery zones, fees, COD/online payment options, and expected delivery time once confirmed.

10. Email/SMS/WhatsApp capture
   - Use product finder results as a lead capture moment once privacy/legal setup is ready.

## Build Status

After this pass:

```bash
npm run build
```

passed successfully.
