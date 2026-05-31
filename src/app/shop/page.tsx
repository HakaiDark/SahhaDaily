import { Suspense } from "react";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata = {
  title: "Shop Supplements in Lebanon | SahhaDaily",
  description: "Browse premium UK-sourced wellness supplements delivered across Lebanon. بضاعة أصلية، وصلت على بيتك."
};

const trustItems = [
  { icon: "🇬🇧", en: "Direct from UK", ar: "مباشرة من بريطانيا" },
  { icon: "🇱🇧", en: "Delivered to Lebanon", ar: "توصيل لكل لبنان" },
  { icon: "✓",   en: "Verified Original", ar: "بضاعة أصلية مضمونة" },
  { icon: "💬",  en: "Order on WhatsApp", ar: "اطلب على واتساب" },
];

export default function ShopPage() {
  return (
    <main className="section">
      <div className="container">

        {/* ── Bilingual hero ── */}
        <div className="shopHero">
          <span className="eyebrow" style={{ display: "block", marginBottom: 18 }}>
            كتالوج المنتجات · Product catalog
          </span>
          <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", marginBottom: 16 }}>
            Shop <em>supplements</em>
          </h1>
          <p className="shopHeroAr">
            صحتك <span>بالديني</span> — كل شي <span>أصلي</span> 🌿
          </p>
          <p className="shopHeroSub">
            Premium UK-sourced wellness, delivered straight to your door across Lebanon.
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

        {/* ── Catalog ── */}
        <Suspense fallback={<p>Loading products...</p>}>
          <ShopFilters />
        </Suspense>

      </div>
    </main>
  );
}
