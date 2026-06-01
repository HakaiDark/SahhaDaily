import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

const LABEL_MAP = {
  bestSeller: { text: "Best Seller", cls: "labelBestSeller" },
  popular:    { text: "Popular",     cls: "labelPopular" },
  new:        { text: "New",         cls: "labelNew" },
  lowStock:   { text: "Low Stock",   cls: "labelLowStock" },
} as const;

function Stars({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const label = product.label ? LABEL_MAP[product.label] : null;
  const chip  = product.keyFeatures[0];

  return (
    <article className="productCard">
      <Link href={`/product/${product.slug}`} className="productImage" aria-label={`View ${product.name}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={700}
          height={700}
          sizes="(max-width: 760px) 100vw, (max-width: 980px) 50vw, 25vw"
          loading="lazy"
        />
        {label && <span className={`productLabel ${label.cls}`}>{label.text}</span>}
      </Link>
      <div className="productBody">
        <div className="badgeRow">
          <span className="badge">{product.category}</span>
          <span className="badge">{product.format}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="ratingRow">
          <Stars rating={product.rating} />
          <span className="ratingCount">({product.reviewCount})</span>
        </div>
        <div className="priceLine">
          <strong>{product.price}</strong>
          <span>Placeholder price</span>
        </div>
        {chip && <p className="featureChip">{chip}</p>}
        <div className="productFooter">
          <span className="sku">{product.sku}</span>
          <Link className="smallLink" href={`/product/${product.slug}`}>View details →</Link>
        </div>
      </div>
    </article>
  );
}

