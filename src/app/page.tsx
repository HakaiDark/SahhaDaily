import Link from "next/link";
import { HeroMotion } from "@/components/HeroMotion";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
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
            <span className="eyebrow">SahhaDaily Lebanon</span>
            <h1>Premium wellness supplements in Lebanon</h1>
            <p className="lead">
              Explore products for daily wellness, beauty, immunity, energy, and active lifestyles.
            </p>
            <div className="heroActions">
              <Link href="/shop" className="btn btnPrimary">Shop products</Link>
              <Link href="#categories" className="btn btnSecondary">Explore categories</Link>
            </div>
          </Reveal>
          <HeroMotion />
        </div>
      </section>

      <section className="container">
        <div className="statStrip">
          <div className="statItem"><strong>{products.length} active products</strong><span>Initial Lebanon batch</span></div>
          <div className="statItem"><strong>{categories.length} categories</strong><span>Grouped by stock sheet</span></div>
          <div className="statItem"><strong>Consistent product cards</strong><span>Mobile, tablet, and desktop ready</span></div>
          <div className="statItem"><strong>Full details pages</strong><span>Benefits, ingredients, and usage</span></div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <Reveal className="sectionHead">
            <div>
              <span className="eyebrow">Shop by category</span>
              <h2>Browse by wellness priority</h2>
            </div>
            <p className="lead">Each product links to a dedicated details page.</p>
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
                <h2>{category} supplements</h2>
              </div>
              <Link href={`/shop?category=${encodeURIComponent(category)}`} className="btn btnSecondary">View all</Link>
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
            <h2>Simple product discovery with clear supplement information.</h2>
            <p>
              Every product page is structured to help customers understand what a supplement supports and how to use it in a daily routine.
            </p>
          </Reveal>
          <div className="principles">
            <Reveal className="principle">
              <h3>Clear structure</h3>
              <p>Categories, cards, and product pages are organized for quick scanning.</p>
            </Reveal>
            <Reveal className="principle" delay={0.05}>
              <h3>Consistent details</h3>
              <p>Every product includes description, benefits, ingredients, and usage guidance.</p>
            </Reveal>
            <Reveal className="principle" delay={0.1}>
              <h3>Safe wording</h3>
              <p>Copy uses supportive wellness language and avoids cure-style claims.</p>
            </Reveal>
            <Reveal className="principle" delay={0.15}>
              <h3>Fast and responsive</h3>
              <p>Lean components and responsive grids keep the site smooth and clean.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
