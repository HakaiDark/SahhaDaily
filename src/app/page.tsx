import Link from "next/link";
import { HeroMotion } from "@/components/HeroMotion";
import { ProductFinder } from "@/components/ProductFinder";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { RoutineBundles } from "@/components/RoutineBundles";
import { categories, products } from "@/data/products";

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

      <section className="section" id="about">
        <div className="container whyGrid">
          <Reveal className="brandPanel">
            <span className="eyebrow" style={{ color: "#f1b094" }}>About SahhaDaily</span>
            <h2>Simple Product Discovery With Clear <span className="hl">Supplement Information</span>.</h2>
            <p>
              Every product page is structured to help customers understand what a supplement supports and how to use it in a daily routine.
            </p>
          </Reveal>
          <div className="principles">
            <Reveal className="principle">
              <h3>Clear Structure</h3>
              <p>Categories, cards, and product pages are organized for quick scanning.</p>
            </Reveal>
            <Reveal className="principle" delay={0.05}>
              <h3>Consistent Details</h3>
              <p>Every product includes description, benefits, ingredients, and usage guidance.</p>
            </Reveal>
            <Reveal className="principle" delay={0.1}>
              <h3>Safe Wording</h3>
              <p>Copy uses supportive wellness language and avoids cure-style claims.</p>
            </Reveal>
            <Reveal className="principle" delay={0.15}>
              <h3>Fast And Responsive</h3>
              <p>Lean components and responsive grids keep the site smooth and clean.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
