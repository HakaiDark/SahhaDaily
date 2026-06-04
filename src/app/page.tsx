import Link from "next/link";
import { HeroMotion } from "@/components/HeroMotion";
import { ProductFinder } from "@/components/ProductFinder";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { RoutineBundles } from "@/components/RoutineBundles";
import { categories, products } from "@/data/products";
import { experts } from "@/data/experts";
import { waLink } from "@/data/contact";

const categorySections = categories
  .map((category) => ({
    category,
    items: products.filter((product) => product.category === category)
  }))
  .filter((section) => section.items.length > 0);

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container heroGrid">
          <Reveal className="heroCopy">
            <span className="eyebrow"><span className="g">Sahha</span>Daily · <span className="g">صحة</span> دايلي</span>
            <h1>Premium Wellness <span className="hl">Supplements</span></h1>
            <p className="arabicTag">صحتك بالديني <em>— <span className="o">Daily</span> Support, Better You.</em></p>
            <p className="lead">
              Explore Products For Daily Wellness, Beauty, Immunity, Energy, And Active Lifestyles.
            </p>
            <div className="heroActions">
              <Link href="/shop" className="btn btnPrimary">Shop Products</Link>
              <Link href="#categories" className="btn btnSecondary">Explore Categories</Link>
            </div>
          </Reveal>
          <HeroMotion />
        </div>
      </section>

      <section className="container">
        <div className="statStrip">
          <div className="statItem"><strong>Delivered To Your Door</strong><span>Fast And Reliable Shipping</span></div>
          <div className="statItem"><strong>WeightWorld Sourced</strong><span>Quality-Verified Formulas</span></div>
          <div className="statItem"><strong>{products.length} Products</strong><span>Across {categories.length} Wellness Categories</span></div>
          <div className="statItem"><strong>Full Details On Every Page</strong><span>Ingredients, Usage, And Nutrition</span></div>
        </div>
      </section>

      <ProductFinder />

      <RoutineBundles />

      <section className="section" id="categories">
        <div className="container">
          <Reveal className="sectionHead">
            <div>
              <span className="eyebrow">Shop By Category</span>
              <h2>Browse By Wellness <span className="hl">Priority</span></h2>
            </div>
            <p className="lead">Each Product Links To A Dedicated Details Page.</p>
          </Reveal>
          <div className="categoryGrid">
            {categorySections.map(({ category, items }, index) => (
              <Reveal key={category} delay={index * 0.04}>
                <Link href={`/shop?category=${encodeURIComponent(category)}`} className="categoryCard">
                  <span className="count">{items.length} product{items.length === 1 ? "" : "s"}</span>
                  <h3>{category}</h3>
                  <p>View the {category.toLowerCase()} range and compare formats.</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {categorySections.map(({ category, items }) => (
        <section className="section" key={category} style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">{category}</span>
                <h2>{category} <span className="hl">Supplements</span></h2>
              </div>
              <Link href={`/shop?category=${encodeURIComponent(category)}`} className="btn btnSecondary">View All</Link>
            </div>
            <div className="productGrid">
              {items.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section" id="experts">
        <div className="container">
          <Reveal className="sectionHead">
            <div>
              <span className="eyebrow">Our Expert Panel</span>
              <h2>Chosen, Not Just <span className="hl">Stocked</span></h2>
            </div>
            <p className="lead">
              Every product we carry is reviewed by an independent panel of specialists across Europe and Lebanon — keeping our range safe, effective, and genuinely useful.
            </p>
          </Reveal>
          <div className="expertGrid">
            {experts.map((expert, index) => (
              <Reveal key={expert.id} delay={index * 0.05} className="expertCard" id={`expert-${expert.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="expertAvatar" src={expert.avatar} alt={expert.name} width={96} height={96} loading="lazy" />
                <span className="expertRegion">{expert.flag} {expert.region}</span>
                <h3>{expert.name}</h3>
                <span className="expertRole">{expert.role}</span>
                <p>{expert.bio}</p>
                <a {...waLink(`Hi SahhaDaily! 🌿 I'd like a wellness consultation with ${expert.name}.`)} className="expertLink">
                  Chat On WhatsApp →
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container whyGrid">
          <Reveal className="brandPanel">
            <span className="eyebrow" style={{ color: "#f1b094" }}>About SahhaDaily</span>
            <h2>European Quality, <span className="hl">Lebanese Heart</span>.</h2>
            <p>
              We operate between Germany and Lebanon. From Germany, <strong>Sohaib</strong> handles sourcing and quality, working directly with established European supplement manufacturers. In Lebanon, <strong>Mohamed</strong> leads our local operations, making sure the right products reach the families who need them.
            </p>
            <p>
              That bridge — European quality with real, on-the-ground Lebanese knowledge — is the heart of what we do.
            </p>
            <p className="brandPromise">
              Our promise is in our name. <strong>Sahha</strong> means health — and our mission is to support yours, every single day.
            </p>
          </Reveal>
          <div className="principles">
            <Reveal className="principle">
              <h3>🇩🇪 Sourced In Europe</h3>
              <p>Sohaib works hand-in-hand with established European manufacturers on sourcing and quality.</p>
            </Reveal>
            <Reveal className="principle" delay={0.05}>
              <h3>🇱🇧 Delivered In Lebanon</h3>
              <p>Mohamed leads local operations, getting the right products to the families who need them.</p>
            </Reveal>
            <Reveal className="principle" delay={0.1}>
              <h3>🔬 Chosen, Not Stocked</h3>
              <p>An independent panel of experts across Europe and Lebanon reviews our range so it stays safe and useful.</p>
            </Reveal>
            <Reveal className="principle" delay={0.15}>
              <h3>📦 Reliable Logistics</h3>
              <p>Dr. Kamal Mohyeldine keeps our supply chain running smoothly — from Europe all the way to your door.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
