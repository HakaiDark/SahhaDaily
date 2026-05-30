"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, formats, products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ShopFilters() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [format, setFormat] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesFormat = format === "All" || product.format === format;
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      return matchesCategory && matchesFormat && matchesSearch;
    });
  }, [category, format, query]);

  return (
    <div className="shopLayout">
      <aside className="filters" aria-label="Product filters">
        <div className="filterHeader">
          <h3>Filter products</h3>
          <button
            className="resetFilters"
            type="button"
            onClick={() => {
              setCategory("All");
              setFormat("All");
              setQuery("");
            }}
          >
            Reset
          </button>
        </div>
        <div className="filterGroup">
          <label htmlFor="search">Search</label>
          <input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product name or SKU" />
        </div>
        <div className="filterGroup">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="filterGroup">
          <label htmlFor="format">Format</label>
          <select id="format" value={format} onChange={(event) => setFormat(event.target.value)}>
            <option>All</option>
            {formats.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </aside>

      <section className="catalogResults" aria-live="polite">
        <div className="catalogResultsHead">
          <p>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "product" : "products"}
          </p>
          <span>{category === "All" ? "All categories" : category} · {format === "All" ? "All formats" : format}</span>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="productGrid catalogGrid">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="emptyResults">
            <h3>No products found</h3>
            <p>Try another category, format, or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
