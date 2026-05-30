import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
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
      </Link>
      <div className="productBody">
        <div className="badgeRow">
          <span className="badge">{product.category}</span>
          <span className="badge">{product.format}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="productFooter">
          <span className="sku">{product.sku}</span>
          <Link className="smallLink" href={`/product/${product.slug}`}>View details</Link>
        </div>
      </div>
    </article>
  );
}
