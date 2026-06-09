import { readdirSync } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, Stars } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { ProductGallery } from "@/components/ProductGallery";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getGoalsForSku } from "@/data/merchandising";
import { waLink } from "@/data/contact";
import { WaIcon } from "@/components/icons";

type ProductPageProps = { params: Promise<{ slug: string }> };

function getGalleryImages(sku: string, primary: string): string[] {
  // Lead with the clean background-removed packshot, then the lifestyle/marketing
  // creatives. The first raw gallery file (NN/01) is the same front-of-pack shot as
  // the packshot, so we drop it to avoid a duplicate.
  const dir = sku.toLowerCase();
  try {
    const files = readdirSync(path.join(process.cwd(), "public", "products", "gallery", dir))
      .filter((f) => /\.(webp|jpe?g|png)$/i.test(f))
      .sort();
    if (files.length) return [primary, ...files.slice(1).map((f) => `/products/gallery/${dir}/${f}`)];
  } catch {
    // no gallery folder for this sku — just show the single packshot
  }
  return [primary];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const goals = getGoalsForSku(product.sku);
  const galleryImages = getGalleryImages(product.sku, product.image);

  const pfaqs = [
    { q: `How do I take ${product.name.split(" ").slice(0, 3).join(" ")}?`, a: product.howToUse },
    { q: "What's inside?", a: product.ingredients },
    { q: "Who is it for?", a: `Designed for ${goals.map((x) => x.label.toLowerCase()).join(", ") || product.category.toLowerCase()}. ${product.whyUse[0] || ""}` },
    { q: "Is it safe to take?", a: product.safety },
    { q: "How do I order and pay?", a: "Add it to your basket and confirm over WhatsApp. Our team replies fast with pricing and delivery, shared on confirmation so it's always up to date." },
    { q: "Are your products original?", a: "Always. Every product is sourced directly from WeightWorld in the UK: verified originals only, never imitations." },
  ];

  return (
    <main>
      <section className="pdx">
        <div className="wrap-wide">
          <Link className="alink pdx-back" href="/shop">← Back to shop</Link>
          <div className="pdx-grid">
            <ProductGallery images={galleryImages} name={product.name} />
            <div className="pdx-info">
              <div className="pdx-cat">{product.category} · {product.sku}</div>
              <h1>{product.name}</h1>
              <div className="rrow" style={{ marginBottom: 16 }}>
                <Stars rating={product.rating} />
                <span className="rcount">{product.rating} · {product.reviewCount} reviews</span>
              </div>
              <p className="pdx-desc">{product.description}</p>
              <div className="pdx-benefits">
                {product.benefits.slice(0, 3).map((b) => (
                  <span key={b}>{b.length > 42 ? b.slice(0, 40) + "…" : b}</span>
                ))}
              </div>
              <div className="pdx-buy">
                <div className="pdx-buy-actions">
                  <a className="btn accent" {...waLink(`Hi SahhaDaily! 🌿 I'd like to order ${product.name}`)}>
                    <span><WaIcon width={18} height={18} />Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ProductTabs product={product} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec tone-mint">
          <div className="wrap-wide">
            <div className="intro">
              <span className="kicker">You may also like</span>
              <h2 className="h-lg">Complete your <span className="accent it">routine</span></h2>
            </div>
            <div className="pgrid">
              {related.map((x) => <ProductCard key={x.id} product={x} />)}
            </div>
          </div>
        </section>
      )}

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap-wide faq-wrap">
          <div className="faq-intro">
            <span className="kicker">Good to know</span>
            <h2 className="h-lg" style={{ marginTop: 16 }}>Questions about this <span className="accent it">product</span></h2>
            <p className="lead">Anything we didn&apos;t cover? Message us on WhatsApp and we reply fast.</p>
            <a className="btn accent faq-help" {...waLink(`Hi SahhaDaily! 🌿 I have a question about ${product.name}`)}>
              <span><WaIcon width={18} height={18} />Ask about this product</span>
            </a>
          </div>
          <div className="pfaq">
            {pfaqs.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary>{f.q}<span className="pm">+</span></summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
