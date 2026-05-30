# SahhaDaily E-commerce Front End

Modern responsive Next.js website for a wellness and supplements store.

## Included

- Home page with premium wellness brand direction
- Shop page with category, format, goal, and SKU search filters
- Product detail pages using dynamic routes
- Motion system with Framer Motion
- Reduced motion support through CSS and Framer Motion hooks
- Product images extracted and cropped from the supplied WeightWorld catalog
- Product data based on the initial Lebanon batch spreadsheet
- Scratched SKU 9 excluded from the active product list

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before launch

Confirm all ingredient panels, dosage directions, warnings, product claims, prices, tax rules, and payment gateway details before publishing.

## Recommended next steps

1. Add real product pricing and inventory fields
2. Replace cropped catalog images with clean supplier packshots
3. Add cart state and checkout provider
4. Add CMS or database, such as Supabase or PostgreSQL
5. Add regulatory approved product copy
