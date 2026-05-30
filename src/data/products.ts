export type Product = {
  id: string;
  number: number;
  sku: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  format: string;
  quantity: number;
  featured?: boolean;
  sourceUrl: string;
  description: string;
  keyFeatures: string[];
  benefits: string[];
  ingredients: string;
  howToUse: string;
  nutritionalInfo: string[];
  whyUse: string[];
  notes: string;
  safety: string;
};

const standardSafety = "Do not exceed the recommended daily dose. Food supplements should not replace a varied, balanced diet and healthy lifestyle. Keep out of reach of children.";

export const products: Product[] = [
  {
    id: "wwlb-1",
    number: 1,
    sku: "CC0224",
    name: "Pure Marine Collagen 2000mg 120 Capsules",
    slug: "pure-marine-collagen-2000mg-120-capsules",
    category: "Health and Wellness",
    image: "/products/immersive/01-cc0224-pure-marine-collagen-2000mg-120-capsules.webp",
    format: "Capsules",
    quantity: 150,
    featured: true,
    sourceUrl: "https://www.weightworld.ie/products/pure-marine-collagen-capsules",
    description: "Marine collagen capsules designed for daily skin, joints, and bones wellness support.",
    keyFeatures: ["Hydrolysed type I marine collagen", "120 capsules per bottle", "Convenient daily capsule format"],
    benefits: ["Supports daily collagen intake", "Designed for skin, joints, and bones routines", "Useful for beauty-from-within plans"],
    ingredients: "Hydrolysed marine collagen. See product label for the complete ingredient list.",
    howToUse: "Take 2 capsules daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 2 capsules", "Marine collagen: 1200mg per serving"],
    whyUse: ["Daily collagen support", "Beauty and active lifestyle routines"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-2",
    number: 2,
    sku: "CC0460",
    name: "Ashwagandha Extract KSM 66 1500mg 180 Tablets",
    slug: "ashwagandha-ksm-66-1500mg-180-tablets",
    category: "Health and Wellness",
    image: "/products/immersive/02-cc0460-ashwagandha-ksm-66-1500mg-180-tablets.webp",
    format: "Tablets",
    quantity: 198,
    featured: true,
    sourceUrl: "https://www.weightworld.ie/products/ashwagandha-ksm-66-tablets",
    description: "KSM-66 ashwagandha tablets for relaxation, energy, focus, and natural-defence routines.",
    keyFeatures: ["1500mg ashwagandha per tablet", "KSM-66 ashwagandha extract", "180 tablets for a 6-month supply"],
    benefits: ["Supports calmness and focus routines", "Useful for energy and relaxation support", "Source of iron and calcium"],
    ingredients: "Ashwagandha extract, dicalcium phosphate, hypromellose, and other excipients listed on the label.",
    howToUse: "Take 1 tablet daily with a full glass of water, preferably with a main meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Ashwagandha extract: 1500mg per serving"],
    whyUse: ["Adaptogen wellness support", "Daily calm and focus routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-3",
    number: 3,
    sku: "CC0533",
    name: "Magnesium Glycinate 1420mg 180 Capsules",
    slug: "magnesium-glycinate-1420mg-180-capsules",
    category: "Health and Wellness",
    image: "/products/immersive/03-cc0533-magnesium-glycinate-1420mg-180-capsules.webp",
    format: "Capsules",
    quantity: 150,
    featured: true,
    sourceUrl: "https://www.weightworld.ie/products/magnesium-glycinate-capsules",
    description: "Magnesium glycinate capsules with vitamin B6 for daily mineral and muscle-function support.",
    keyFeatures: ["1420mg magnesium glycinate per serving", "Added vitamin B6", "180 capsules for a 3-month supply"],
    benefits: ["Magnesium contributes to reduced tiredness and fatigue", "Supports electrolyte balance", "Contributes to normal muscle function"],
    ingredients: "Magnesium bisglycinate, vitamin B6, and supporting capsule ingredients listed on the label.",
    howToUse: "Take 2 capsules daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 2 capsules", "Magnesium glycinate: 1420mg per serving", "Vitamin B6: 2mg per serving"],
    whyUse: ["Daily magnesium intake", "Evening and active lifestyle routines"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-4",
    number: 4,
    sku: "CC0350",
    name: "Omega 3 Fish Oil 2000mg 240 Softgels",
    slug: "omega-3-fish-oil-2000mg-240-softgels",
    category: "Health and Wellness",
    image: "/products/immersive/04-cc0350-omega-3-fish-oil-2000mg-240-softgels.webp",
    format: "Softgels",
    quantity: 105,
    featured: true,
    sourceUrl: "https://www.weightworld.ie/products/omega-3-fish-oil-softgel",
    description: "Omega-3 fish oil softgels with EPA and DHA for heart, brain, and vision support.",
    keyFeatures: ["1100mg omega-3 fatty acids per serving", "660mg EPA and 440mg DHA", "240 softgels for a 4-month supply"],
    benefits: ["EPA and DHA contribute to normal heart function", "DHA contributes to normal brain function", "DHA contributes to normal vision"],
    ingredients: "Fish oil softgels. See label for full excipients and allergen details.",
    howToUse: "Take 2 softgels daily with a full glass of water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 2 softgels", "Fish oil: 1000mg", "Omega-3: 550mg", "EPA: 330mg", "DHA: 220mg"],
    whyUse: ["Daily omega-3 intake", "Heart, brain, and active wellness routines"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-5",
    number: 5,
    sku: "CC0410",
    name: "Multivitamins with Minerals 400 Tablets",
    slug: "multivitamins-with-minerals-400-tablets",
    category: "Vitamins and Minerals",
    image: "/products/immersive/05-cc0410-multivitamins-with-minerals-400-tablets.webp",
    format: "Tablets",
    quantity: 70,
    sourceUrl: "https://www.weightworld.ie/products/multivitamins-and-minerals",
    description: "A daily multivitamin and mineral tablet with 27 vitamins and minerals for all-round wellbeing.",
    keyFeatures: ["27 vitamins and minerals", "400 tablets for over 1 year's supply", "Small peppermint-flavoured tablets"],
    benefits: ["Supports immune system routines", "Contributes to reduced tiredness and fatigue", "Supports normal energy-yielding metabolism"],
    ingredients: "Vitamins and minerals including vitamin C, magnesium, iron, zinc, B vitamins, iodine, selenium, D3, and K2.",
    howToUse: "Take 1 tablet daily with a full glass of water, preferably with a main meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Includes vitamin C, B vitamins, magnesium, iron, zinc, D3, K2, iodine, selenium, and chromium"],
    whyUse: ["Foundational daily nutrition", "Broad vitamin and mineral support"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-6",
    number: 6,
    sku: "CC0394",
    name: "Vitamin D3 4000IU + K2 MK 7 125mcg 240 Tablets",
    slug: "vitamin-d3-k2-mk7-240-tablets",
    category: "Vitamins and Minerals",
    image: "/products/immersive/06-cc0394-vitamin-d3-k2-mk7-240-tablets.webp",
    format: "Tablets",
    quantity: 198,
    sourceUrl: "https://www.weightworld.ie/products/vitamin-d3-k2-mk7",
    description: "High-strength vitamin D3 and K2 tablets for bones, muscles, and natural-defence routines.",
    keyFeatures: ["4000IU vitamin D3 per tablet", "125mcg K2 MK-7 per tablet", "High-strength daily tablet format"],
    benefits: ["Vitamin D contributes to normal immune function", "Vitamin D contributes to normal bones and teeth", "Vitamin K contributes to normal blood clotting"],
    ingredients: "Vitamin D3, vitamin K2 MK-7, and tablet excipients listed on the label.",
    howToUse: "Take 1 tablet daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Vitamin D3: 4000IU", "Vitamin K2 MK-7: 125mcg"],
    whyUse: ["Vitamin D and K support", "Bone and immune wellness routines"],
    notes: "Sheet lists 240 tablets; WeightWorld IE page may show a different pack size, so the launch sheet pack size is preserved.",
    safety: standardSafety
  },
  {
    id: "wwlb-7",
    number: 7,
    sku: "CC0009",
    name: "Calcium, Magnesium and Zinc with Vitamin D3 400 Tablets",
    slug: "calcium-magnesium-zinc-vitamin-d3-400-tablets",
    category: "Bones and Joints",
    image: "/products/immersive/07-cc0009-calcium-magnesium-zinc-vitamin-d3-400-tablets.webp",
    format: "Tablets",
    quantity: 48,
    sourceUrl: "https://www.weightworld.ie/products/calcium-magnesium-and-zinc-with-vitamin-d3",
    description: "A calcium, magnesium, zinc, and vitamin D3 formula for all-round bone, muscle, and mineral support.",
    keyFeatures: ["Calcium, magnesium, zinc, and vitamin D blend", "Includes copper, manganese, selenium, boron, D3, and K2", "400 tablets for over 1 year's supply"],
    benefits: ["Calcium and magnesium contribute to normal muscle function", "Calcium and vitamin D contribute to normal bones and teeth", "Supports natural-defence and cognitive routines"],
    ingredients: "Calcium carbonate, magnesium, zinc oxide, manganese, copper, vitamin K, vitamin D3, selenium, boron, and excipients listed on the label.",
    howToUse: "Take 1 tablet daily with a full glass of water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Calcium carbonate: 500mg", "Magnesium: 200mg", "Zinc oxide: 5mg", "Vitamin D3: 20mcg", "Vitamin K: 200mcg"],
    whyUse: ["Bone and mineral routine", "Daily muscle-function support"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-8",
    number: 8,
    sku: "CC0349",
    name: "Biotin 12000mcg 365 Tablets",
    slug: "biotin-12000mcg-365-tablets",
    category: "Beauty, Hair and Skin",
    image: "/products/immersive/08-cc0349-biotin-12000mcg-365-tablets.webp",
    format: "Tablets",
    quantity: 72,
    sourceUrl: "https://www.weightworld.ie/products/biotin-tablets",
    description: "High-strength biotin tablets for hair, skin, and nails wellness routines.",
    keyFeatures: ["12,000mcg biotin per tablet", "365 tablets for a full-year supply", "Vegan-friendly tablet format"],
    benefits: ["Biotin contributes to normal hair maintenance", "Biotin contributes to normal skin maintenance", "Supports everyday beauty routines"],
    ingredients: "Biotin and tablet excipients listed on the label.",
    howToUse: "Take 1 tablet daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Biotin: 12,000mcg"],
    whyUse: ["Hair, skin, and nails support", "Beauty-from-within routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-9",
    number: 9,
    sku: "CC0543",
    name: "Multivitamin Gummies for Men 60 Gummies",
    slug: "multivitamin-gummies-for-men-60-gummies",
    category: "Men's Wellness",
    image: "/products/immersive/09-cc0543-multivitamin-gummies-for-men-60-gummies.webp",
    format: "Gummies",
    quantity: 8,
    sourceUrl: "https://www.weightworld.ie/products/multivitamin-gummies-for-men",
    description: "Men's multivitamin gummies for convenient daily vitality and wellness support.",
    keyFeatures: ["60 gummies per bottle", "Men-focused multivitamin formula", "Easy chewable gummy format"],
    benefits: ["Supports daily vitality routines", "Designed for men's wellness needs", "Convenient alternative to tablets"],
    ingredients: "Vitamin and mineral gummy blend. See label for full ingredient and sweetener details.",
    howToUse: "Chew the recommended daily serving as directed on the product label.",
    nutritionalInfo: ["Serving details vary by label", "Includes a men's multivitamin blend"],
    whyUse: ["Men's daily wellness", "Gummy multivitamin support"],
    notes: "Included as row 9 from the provided stock sheet.",
    safety: standardSafety
  },
  {
    id: "wwlb-10",
    number: 10,
    sku: "CC0544",
    name: "Multivitamin Gummies for Women 90 Gummies",
    slug: "multivitamin-gummies-for-women-90-gummies",
    category: "Women's Wellness",
    image: "/products/immersive/10-cc0544-multivitamin-gummies-for-women-90-gummies.webp",
    format: "Gummies",
    quantity: 48,
    sourceUrl: "https://www.weightworld.ie/products/multivitamin-gummies-for-women",
    description: "Women's multivitamin gummies with vitamins, minerals, evening primrose oil, CoQ10, and hyaluronic acid.",
    keyFeatures: ["10 vitamins and minerals", "Strawberry and raspberry flavour", "90 gummies for a 1.5-month supply"],
    benefits: ["Supports energy and mental wellbeing routines", "Supports skin, bones, inner defences, and vitality", "Designed for women's monthly wellness routines"],
    ingredients: "Vitamin and mineral gummy blend with evening primrose oil, CoQ10, hyaluronic acid, and fruit flavours.",
    howToUse: "Chew 2 gummies daily. They can be taken together or separately during the day.",
    nutritionalInfo: ["Serving size: 2 gummies", "Includes calcium, vitamin E, vitamin C, CoQ10, evening primrose oil, zinc, B6, folic acid, biotin, iodine, and B12"],
    whyUse: ["Women's daily vitality", "Beauty and wellness gummy routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-11",
    number: 11,
    sku: "CC0513",
    name: "Iron and Vitamin C Gummies for Kids 120 Gummies",
    slug: "iron-vitamin-c-gummies-for-kids-120-gummies",
    category: "Kids",
    image: "/products/immersive/11-cc0513-iron-vitamin-c-gummies-for-kids-120-gummies.webp",
    format: "Gummies",
    quantity: 48,
    sourceUrl: "https://www.weightworld.ie/products/iron-vitamin-c-gummies-for-kids",
    description: "Kids iron and vitamin C gummies in a mixed berry flavour for child-friendly daily support.",
    keyFeatures: ["Iron gummies for kids with vitamin C", "Star-shaped mixed berry gummies", "120 gummies per bottle"],
    benefits: ["Supports children's physical and mental development routines", "Vitamin C supports dietary iron absorption", "Designed for brain, natural-defence, bones, and skin routines"],
    ingredients: "Vitamin C, iron, glucose syrup, sugar, pectin, natural flavours, and other gummy ingredients listed on the label.",
    howToUse: "Children above 3 years can chew 1 gummy daily, or as directed on the label.",
    nutritionalInfo: ["Serving size: 1 gummy", "Vitamin C: 10mg", "Iron: 7mg"],
    whyUse: ["Child-friendly iron intake", "Family wellness routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: "Do not give to children under 3 years. Keep out of reach of children. Food supplements should not replace a varied diet."
  },
  {
    id: "wwlb-12",
    number: 12,
    sku: "CC0505",
    name: "Vitamin C and Zinc 1000mg 180 Tablets",
    slug: "vitamin-c-and-zinc-1000mg-180-tablets",
    category: "Immunity",
    image: "/products/immersive/12-cc0505-vitamin-c-and-zinc-1000mg-180-tablets.webp",
    format: "Tablets",
    quantity: 150,
    sourceUrl: "https://www.weightworld.ie/products/vitamin-c-zinc",
    description: "Vitamin C and zinc tablets in a 2-in-1 blend for immune and antioxidant support routines.",
    keyFeatures: ["1010mg vitamin C with zinc per serving", "180 tablets for a 6-month supply", "Vegan and magnesium stearate-free"],
    benefits: ["Vitamin C and zinc contribute to normal immune function", "Vitamin C and zinc contribute to protection from oxidative stress", "Vitamin C contributes to normal energy-yielding metabolism"],
    ingredients: "Vitamin C, zinc, and tablet excipients listed on the label.",
    howToUse: "Take 1 tablet daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Vitamin C: 1000mg", "Zinc: 10mg"],
    whyUse: ["Daily immune support", "Antioxidant wellness routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-13",
    number: 13,
    sku: "CC0530",
    name: "Berberine 500mg 120 Capsules",
    slug: "berberine-500mg-120-capsules",
    category: "Heart and Liver",
    image: "/products/immersive/13-cc0530-berberine-500mg-120-capsules.webp",
    format: "Capsules",
    quantity: 48,
    sourceUrl: "https://www.weightworld.ie/products/weightworld-berberine-500mg-120-capsules",
    description: "Pure berberine capsules for daily wellness and metabolic support routines.",
    keyFeatures: ["500mg berberine per capsule", "120 capsules per bottle", "Daily capsule format"],
    benefits: ["Supports balanced daily wellness routines", "Designed for advanced supplement shoppers", "Complements heart and liver category merchandising"],
    ingredients: "Berberine and capsule ingredients listed on the product label.",
    howToUse: "Take as directed on the product label with water.",
    nutritionalInfo: ["Serving details vary by label", "Berberine: 500mg per capsule"],
    whyUse: ["Metabolic wellness routine", "Heart and liver category support"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: "Consult a healthcare professional before use if pregnant, breastfeeding, taking medication, or under medical supervision."
  },
  {
    id: "wwlb-14",
    number: 14,
    sku: "CC0288",
    name: "Glucosamine and Chondroitin 180 Capsules",
    slug: "glucosamine-and-chondroitin-180-capsules",
    category: "Bones and Joints",
    image: "/products/immersive/14-cc0288-glucosamine-and-chondroitin-180-capsules.webp",
    format: "Capsules",
    quantity: 120,
    sourceUrl: "https://www.weightworld.ie/products/glucosamine-chondroitin-capsules",
    description: "Glucosamine, chondroitin, and MSM capsules with vitamin C, hyaluronic acid, turmeric, and MSM.",
    keyFeatures: ["1000mg glucosamine and 200mg chondroitin per 2 capsules", "With vitamin C, hyaluronic acid, turmeric, and MSM", "180 easy-to-swallow capsules"],
    benefits: ["Supports joint and mobility routines", "Vitamin C contributes to normal collagen formation", "Designed for bones, joints, and active living merchandising"],
    ingredients: "Glucosamine sulphate, chondroitin sulphate, MSM, vitamin C, hyaluronic acid, turmeric, and capsule ingredients.",
    howToUse: "Take 2 capsules daily with water, preferably with a meal.",
    nutritionalInfo: ["Serving size: 2 capsules", "Glucosamine: 1000mg", "Chondroitin sulphate: 200mg"],
    whyUse: ["Joint and mobility support", "Daily bones and joints routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  },
  {
    id: "wwlb-15",
    number: 15,
    sku: "CC0409",
    name: "Vitamin B Complex 365 Tablets",
    slug: "vitamin-b-complex-365-tablets",
    category: "Vitamins and Minerals",
    image: "/products/immersive/15-cc0409-vitamin-b-complex-365-tablets.webp",
    format: "Tablets",
    quantity: 119,
    sourceUrl: "https://www.weightworld.ie/products/vitamin-b-complex",
    description: "Vitamin B complex tablets with all 8 B vitamins and vitamin C for daily energy and nervous-system support routines.",
    keyFeatures: ["Balanced blend of B vitamins and vitamin C", "365 tablets for a 1-year supply", "Vegan and magnesium stearate-free"],
    benefits: ["Vitamin C contributes to normal immune function", "Riboflavin contributes to normal energy-yielding metabolism", "Vitamin B12 contributes to normal nervous-system function", "Biotin contributes to normal skin and hair maintenance"],
    ingredients: "Vitamin C, B1, B2, B3, B5, B6, B9, biotin, B12, and tablet excipients listed on the label.",
    howToUse: "Take 1 tablet daily, preferably with a meal.",
    nutritionalInfo: ["Serving size: 1 tablet", "Vitamin C: 80mg", "Vitamin B3: 24mg", "Vitamin B5: 20mg", "Vitamin B6: 10mg", "Vitamin B1: 10mg", "Vitamin B12: 50mcg"],
    whyUse: ["Daily energy support", "Vitamin B routine"],
    notes: "Product details cross-referenced with the WeightWorld IE product page.",
    safety: standardSafety
  }
];

export const categories = Array.from(new Set(products.map((product) => product.category)));
export const formats = Array.from(new Set(products.map((product) => product.format))).sort();

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.slug !== product.slug)
    .filter((item) => item.category === product.category)
    .slice(0, 4);
}
