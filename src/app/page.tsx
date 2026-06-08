import Link from "next/link";
import { products, categories } from "@/data/products";
import { Hero } from "@/components/Hero";
import { ExpertsSection } from "@/components/ExpertsSection";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";

const marqueeItems = [
  "🌿 100% verified originals · بضاعة أصلية مضمونة",
  "🇬🇧 Directly sourced from Europe · من أوروبا",
  "🚚 Delivered to your door · توصيل لحد عندك",
  "💬 Order on WhatsApp · اطلب على واتساب",
];

function Marquee() {
  const set = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {set.map((m, i) => (
          <span className="marquee-item" key={i}>{m}<span className="dot" /></span>
        ))}
      </div>
    </div>
  );
}

function Featured() {
  const picked = products.filter((p) => p.featured || p.label === "bestSeller" || p.label === "popular").slice(0, 8);
  const list = picked.length >= 8 ? picked : products.slice(0, 8);
  return (
    <section className="sec" id="featured">
      <div className="wrap-wide">
        <Reveal className="intro">
          <span className="kicker">Bestsellers</span>
          <h2 className="h-lg">The everyday <span className="accent it">essentials</span></h2>
          <p className="lead">The formulas our customers reach for most.</p>
        </Reveal>
        <div className="pgrid">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.05}><ProductCard product={p} /></Reveal>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "clamp(36px,4vw,56px)" }}>
          <Link className="btn ghost" href="/shop"><span>View all products<ArrowIcon width={17} height={17} /></span></Link>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const rows = categories
    .map((cat) => ({ cat, items: products.filter((p) => p.category === cat) }))
    .filter((s) => s.items.length);
  return (
    <section className="sec" id="categories">
      <div className="wrap-wide">
        <Reveal className="intro">
          <span className="kicker">Shop by category</span>
          <h2 className="h-lg">Find your <span className="accent it">priority</span></h2>
          <p className="lead">Browse the range by what matters most to you.</p>
        </Reveal>
        <div className="catg-grid">
          {rows.map((r) => (
            <Reveal as="div" key={r.cat}>
              <Link className="catg-card" href={`/shop?category=${encodeURIComponent(r.cat)}`}>
                <span className="catg-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.items[0].image} alt={r.cat} />
                </span>
                <span className="catg-info">
                  <h3>{r.cat}</h3>
                  <span>{r.items.length} product{r.items.length === 1 ? "" : "s"}</span>
                </span>
                <span className="catg-arrow"><ArrowIcon width={22} height={22} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const vals: [string, string][] = [
    ["Trust", "Verified originals, always"],
    ["Transparency", "Honest about what we carry"],
    ["Care", "Chosen by our expert panel"],
  ];
  return (
    <section className="sec whoweare" id="about">
      <div className="wrap-wide whoweare-grid">
        <Reveal className="whoweare-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/who-we-are.png" alt="Who we are: SahhaDaily, a family-led wellness brand based in Lebanon" />
        </Reveal>
        <div className="whoweare-copy">
          <Reveal>
            <span className="kicker">Who we are</span>
            <h2 className="h-lg">A family-led <span className="accent it">wellness brand.</span></h2>
            <p className="lead">Our goal is to bring trusted European wellness products closer to customers in Lebanon, based in West Bekaa, Al Qaraoun.</p>
          </Reveal>
          <Reveal className="whoweare-vals">
            {vals.map(([t, p]) => (
              <div className="wv" key={t}><strong>{t}</strong><span>{p}</span></div>
            ))}
          </Reveal>
          <p className="ar" style={{ marginTop: 16, color: "var(--green)", fontWeight: 700 }}>دعم يومي لصحة أفضل 🌿</p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Featured />
      <Categories />
      <ExpertsSection />
      <WhoWeAre />
    </main>
  );
}
