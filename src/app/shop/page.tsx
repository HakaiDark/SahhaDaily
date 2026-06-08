import { ShopClient } from "@/components/ShopClient";

type ShopPageProps = { searchParams: Promise<{ category?: string }> };

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  return (
    <main style={{ paddingTop: 40 }}>
      <section className="sec-sm">
        <div className="wrap-wide">
          <div className="shop-hero">
            <span className="kicker center">كتالوج المنتجات · Product catalog</span>
            <h1 className="display" style={{ marginTop: 20 }}>Shop <span className="accent it">supplements</span></h1>
            <p className="shop-hero-ar ar" style={{ marginTop: 14 }}>مكمّلات <span className="o">أصلية</span> من أوروبا 🌿</p>
            <p className="lead" style={{ marginInline: "auto", marginTop: 10 }}>Premium European-sourced wellness, delivered straight to your door.</p>
          </div>
        </div>
      </section>
      <section className="sec-sm" style={{ paddingTop: 0 }}>
        <div className="wrap-wide">
          <ShopClient initialCategory={category} />
        </div>
      </section>
    </main>
  );
}
