import Link from "next/link";
import { products } from "@/data/products";
import { routineBundles } from "@/data/merchandising";

function getBundleProducts(skus: string[]) {
  return skus
    .map((sku) => products.find((product) => product.sku === sku))
    .filter(Boolean);
}

export function RoutineBundles() {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Routine stacks</span>
            <h2>Curated supplement bundles</h2>
          </div>
          <p className="lead">Top supplement shops make routines easier to buy. These stacks guide customers without overwhelming them.</p>
        </div>

        <div className="bundleGrid">
          {routineBundles.map((bundle) => {
            const bundleProducts = getBundleProducts(bundle.skus);
            const whatsappText = encodeURIComponent(
              `Hi SahhaDaily! 🌿\nI want the ${bundle.title}:\n${bundleProducts.map((product) => `• ${product?.name} (${product?.sku})`).join("\n")}\n\nName:\nCity:\nAddress:`
            );

            return (
              <article className="bundleCard" key={bundle.id}>
                <span className="eyebrow">{bundle.eyebrow}</span>
                <h3>{bundle.title}</h3>
                <p>{bundle.description}</p>
                <div className="bundleProducts">
                  {bundleProducts.map((product) => product && (
                    <Link href={`/product/${product.slug}`} key={product.sku}>
                      <span>{product.name}</span>
                      <small>{product.sku}</small>
                    </Link>
                  ))}
                </div>
                <a
                  className="btn btnSecondary"
                  href={`https://wa.me/96170000000?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask for this stack
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
