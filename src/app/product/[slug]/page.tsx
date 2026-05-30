import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import scrapedProducts from "@/data/weightworld-scraped-launch-products.json";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

type ProductContentSection = {
  heading: string;
  paragraphs: string[];
  items: string[];
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

function isSectionHeading(line: string) {
  return (
    line.endsWith("?") ||
    /^(What|Benefits|Why|How|Who|Key Ingredients|Directions|Nutritional|Supplement Facts)/i.test(line)
  );
}

function splitProductContent(text: string): ProductContentSection[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: ProductContentSection[] = [];
  let current: ProductContentSection | undefined;

  for (const line of lines) {
    if (isSectionHeading(line)) {
      current = { heading: line, paragraphs: [], items: [] };
      sections.push(current);
      continue;
    }

    if (!current) {
      current = { heading: "Product overview", paragraphs: [], items: [] };
      sections.push(current);
    }

    if (line.length < 150 && !line.endsWith(".")) {
      current.items.push(line);
    } else {
      current.paragraphs.push(line);
    }
  }

  return sections;
}

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
    title: product ? `${product.name} | SahhaDaily Lebanon` : "Product | SahhaDaily Lebanon",
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
  const productContent = splitProductContent(scrapedProduct?.descriptionText ?? "");
  const nutrition = scrapedProduct?.nutrition as ScrapedNutrition;
  const scrapedGallery = scrapedProduct as ScrapedProductGallery | undefined;
  const galleryImages = scrapedGallery?.localImages?.length ? scrapedGallery.localImages : [product.image];
  const overviewSection = productContent[0];
  const detailSections = productContent.slice(1);

  return (
    <main>
      <section className="productHero">
        <div className="container productHeroGrid">
          <ProductGallery images={galleryImages} name={product.name} />
          <div className="detailPanel">
            <Link href="/shop" className="smallLink">Back to shop</Link>
            <div className="metaList">
              <span className="badge">{product.category}</span>
              <span className="badge">{product.format}</span>
              <span className="badge">{product.sku}</span>
            </div>
            <h1>{product.name}</h1>
            <p className="lead">{product.description}</p>
            <div className="featureList" aria-label="Key product features">
              {product.keyFeatures.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="container productDetailsShell">
          <div className="productIntro">
            {overviewSection && (
              <>
                <span className="eyebrow">Product overview</span>
                <h2>{overviewSection.heading}</h2>
                {overviewSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            )}
          </div>

          <div className="productAccordions">
            {detailSections.map((section, index) => (
              <ProductAccordion key={section.heading} title={section.heading} open={index === 0}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items.length > 0 && (
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </ProductAccordion>
            ))}

            <ProductAccordion title="Key features">
              <ul>
                {product.keyFeatures.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </ProductAccordion>

            <ProductAccordion title="How to use">
              <p>{product.howToUse}</p>
            </ProductAccordion>

            <ProductAccordion title="Ingredients">
              <p>{nutrition?.otherIngredients || product.ingredients}</p>
            </ProductAccordion>

            <ProductAccordion title="Nutritional information">
              {nutrition?.serving && <p className="servingText">{nutrition.serving}</p>}
              {nutrition?.rows && nutrition.rows.length > 0 ? (
                <div className="nutritionTableWrap">
                  <table className="nutritionTable">
                    <thead>
                      <tr>
                        <th>Amount per serving</th>
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
                <ul>
                  {product.nutritionalInfo.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </ProductAccordion>

            <ProductAccordion title="Advice and storage">
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
                <span className="eyebrow">Related products</span>
                <h2>You may also like</h2>
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
