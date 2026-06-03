import { Suspense } from "react";
import { ProductFinder } from "@/components/ProductFinder";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata = {
  title: "Shop Supplements | SahhaDaily",
  description: "Browse premium UK-sourced wellness supplements delivered straight to your door. بضاعة أصلية، وصلت على بيتك."
};

const trustItems = [
  { icon: "🇬🇧", en: "Direct From UK", ar: "مباشرة من بريطانيا" },
  { icon: "🚚", en: "Delivered To Your Door", ar: "توصيل لحد عندك" },
  { icon: "✓",   en: "Verified Original", ar: "بضاعة أصلية مضمونة" },
  { icon: "💬",  en: "Order On WhatsApp", ar: "اطلب على واتساب" },
];

export default function ShopPage() {
  return (
    <main className="section">
      <div className="container">

        {/* ── Bilingual hero ── */}
        <div className="shopHero">
          <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>
            كتالوج المنتجات · Product Catalog
          </span>
          <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", marginBottom: 16 }}>
            Shop <em>Supplements</em>
          </h1>
          <p className="shopHeroAr">
            صحتك <span>بالديني</span> — كل شي <span>أصلي</span> 🌿
          </p>
          <p className="shopHeroSub">
            Premium UK-Sourced Wellness, Delivered Straight To Your Door.
            <br />
            <span style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, color: "var(--green)" }}>
              وصلت على بيتك من أحسن ماركات أوروبا.
            </span>
          </p>
        </div>

        {/* ── Trust strip ── */}
        <div className="shopTrust">
          {trustItems.map(({ icon, en, ar }) => (
            <div key={en} className="shopTrustItem">
              <span className="shopTrustIcon">{icon}</span>
              <span>
                {en}
                <span className="shopTrustAr"> · {ar}</span>
              </span>
            </div>
          ))}
        </div>

        {/* ── Guided routine finder ── */}
        <ProductFinder />

        {/* ── Catalog ── */}
        <Suspense fallback={<p>Loading products...</p>}>
          <ShopFilters />
        </Suspense>

      </div>
    </main>
  );
}
