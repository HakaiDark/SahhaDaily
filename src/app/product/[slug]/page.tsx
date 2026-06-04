import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { getGoalsForSku } from "@/data/merchandising";
import { waLink } from "@/data/contact";
import scrapedProducts from "@/data/weightworld-scraped-launch-products.json";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

type ScrapedNutrition = {
  serving?: string;
  rows?: Array<{
    nutrient: string;
    amount: string;
    nrv: string;
  }>;
  otherIngredients?: string;
  advice?: string;
  storage?: string;
} | null;

type ScrapedProductGallery = {
  localImages?: string[];
};

const trustBadges = ["🇬🇧 UK-Sourced", "🔬 Third-Party Tested", "🌿 GMP Quality", "✅ Verified Original"];

function ProductAccordion({
  title,
  children,
  open = false
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="productAccordion" open={open}>
      <summary>{title}</summary>
      <div className="accordionBody">{children}</div>
    </details>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.name} | SahhaDaily` : "Product | SahhaDaily",
    description: product?.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const scrapedProduct = scrapedProducts.products.find((item) => item.sku === product.sku);
  const nutrition = scrapedProduct?.nutrition as ScrapedNutrition;
  const scrapedGallery = scrapedProduct as ScrapedProductGallery | undefined;
  const galleryImages = scrapedGallery?.localImages?.length ? scrapedGallery.localImages : [product.image];
  const productGoals = getGoalsForSku(product.sku);
  const orderMessage = [
    "Hi SahhaDaily! 🌿",
    "I'd like to order:",
    "• " + product.name,
    "• SKU: " + product.sku,
    "",
    "My details:",
    "Name: ",
    "City: ",
    "Address: "
  ].join("\n");

  return (
    <main>
      <section className="productHero">
        <div className="container productHeroGrid">
          <ProductGallery images={galleryImages} name={product.name} />
          <div className="detailPanel">
            <Link href="/shop" className="smallLink">← Back To Shop</Link>
            <div className="metaList">
              <span className="badge">{product.category}</span>
              <span className="badge">{product.format}</span>
              <span className="badge">{product.sku}</span>
              {product.label === "bestSeller" && <span className="badge" style={{ background: "var(--green)", color: "#fff" }}>Best Seller</span>}
              {product.label === "lowStock" && <span className="badge" style={{ background: "rgba(180,50,30,0.9)", color: "#fff" }}>Low Stock</span>}
              {product.label === "new" && <span className="badge" style={{ background: "var(--accent)", color: "#fff" }}>New</span>}
            </div>
            <h1>{product.name}</h1>
            <div className="ratingRow" style={{ marginBottom: 16 }}>
              <span className="stars" aria-label={`${product.rating} out of 5`}>
                {"★".repeat(Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 ? "½" : ""}
                {"☆".repeat(5 - Math.floor(product.rating) - (product.rating % 1 >= 0.5 ? 1 : 0))}
              </span>
              <span className="ratingCount">{product.rating} · {product.reviewCount} verified reviews</span>
            </div>
            <p className="lead">{product.description}</p>

            <ul className="checkList detailBenefits" aria-label="Key benefits">
              {product.benefits.slice(0, 3).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

            <div className="purchasePanel">
              <div>
                <span>Ready To Order?</span>
                <strong>Reserve Yours Via WhatsApp</strong>
              </div>
              <a {...waLink(orderMessage)} className="btn btnPrimary">
                Order On WhatsApp
              </a>
            </div>

            <div className="trustChips" aria-label="Shopping confidence">
              {trustBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StickyOrderBar name={product.name} message={orderMessage} />

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="container productDetailsShell">
          <div className="productIntro">
            <div className="productSpecCard">
              <span className="eyebrow">Quick Specs</span>
              <dl>
                <div><dt>Format</dt><dd>{product.format}</dd></div>
                <div><dt>Rating</dt><dd>{product.rating} / 5</dd></div>
                <div><dt>Routine Fit</dt><dd>{productGoals.map((goal) => goal.shortLabel).join(", ") || product.category}</dd></div>
              </dl>
            </div>

            {productGoals.length > 0 && (
              <div className="routineFitCard">
                <span className="eyebrow">Fits These Routines</span>
                {productGoals.map((goal) => (
                  <div key={goal.id}>
                    <strong>{goal.label}</strong>
                    <p>{goal.description}</p>
                  </div>
                ))}
              </div>
            )}

            {product.whyUse.length > 0 && (
              <div className="routineFitCard">
                <span className="eyebrow">Why Choose This</span>
                <ul className="checkList">
                  {product.whyUse.map((reason) => <li key={reason}>{reason}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="productAccordions">
            <ProductAccordion title="Benefits" open>
              <ul className="checkList">
                {product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </ProductAccordion>

            <ProductAccordion title="Key Features">
              <ul className="checkList">
                {product.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </ProductAccordion>

            <ProductAccordion title="How To Use">
              <p>{product.howToUse}</p>
            </ProductAccordion>

            <ProductAccordion title="Ingredients">
              <p>{nutrition?.otherIngredients || product.ingredients}</p>
            </ProductAccordion>

            <ProductAccordion title="Nutritional Information">
              {nutrition?.serving && <p className="servingText">{nutrition.serving}</p>}
              {nutrition?.rows && nutrition.rows.length > 0 ? (
                <div className="nutritionTableWrap">
                  <table className="nutritionTable">
                    <thead>
                      <tr>
                        <th>Amount Per Serving</th>
                        <th>Amount</th>
                        <th>%NRV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nutrition.rows.map((row) => (
                        <tr key={`${row.nutrient}-${row.amount}`}>
                          <td>{row.nutrient}</td>
                          <td>{row.amount}</td>
                          <td>{row.nrv}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <ul className="checkList">
                  {product.nutritionalInfo.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </ProductAccordion>

            <ProductAccordion title="Advice And Storage">
              <p>{nutrition?.advice || product.safety}</p>
              {nutrition?.storage && <p>{nutrition.storage}</p>}
            </ProductAccordion>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">Related Products</span>
                <h2>You May Also <span className="hl">Like</span></h2>
              </div>
            </div>
            <div className="productGrid">
              {relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
