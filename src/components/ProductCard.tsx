import Link from "next/link";
import type { Product } from "@/data/products";
import { ArrowIcon } from "./icons";

const LABELS: Record<string, { t: string; cls: string }> = {
  bestSeller: { t: "Best Seller", cls: "bestSeller" },
  popular: { t: "Popular", cls: "popular" },
  new: { t: "New", cls: "new" },
  lowStock: { t: "Low Stock", cls: "lowStock" },
};

export function Stars({ rating }: { rating: number }) {
  const pct = (Math.max(0, Math.min(5, rating)) / 5) * 100;
  return (
    <span className="stars" aria-label={`${rating} out of 5`} title={`${rating} / 5`}>
      <span className="stars-empty">★★★★★</span>
      <span className="stars-fill" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const label = product.label ? LABELS[product.label] : null;
  return (
    <article className="pcard">
      <div className="pcard-media">
        {label && <span className={"tag " + label.cls}>{label.t}</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <Link className="pcard-link" href={`/product/${product.slug}`} aria-label={`View ${product.name}`} />
      <div className="pcard-body">
        <div className="pcard-meta">
          <span className="pcard-cat">{product.category}</span>
          <span className="pcard-cat" style={{ color: "var(--muted)" }}>{product.format}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="rrow">
          <Stars rating={product.rating} />
          <span className="rcount">({product.reviewCount})</span>
        </div>
        <div className="pcard-foot">
          <span className="alink" style={{ fontSize: "0.82rem" }}>
            <span className="ln">View</span>
            <ArrowIcon width={15} height={15} />
          </span>
        </div>
      </div>
    </article>
  );
}
