"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, formats, products } from "@/data/products";
import { wellnessGoals, getGoalById, getGoalsForSku } from "@/data/merchandising";
import { ProductCard } from "./ProductCard";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "stock", label: "Stock: high to low" },
  { value: "name", label: "A to Z" }
];

export function ShopFilters() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const initialFormat = searchParams.get("format") ?? "All";
  const initialGoal = searchParams.get("goal") ?? "All";
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [format, setFormat] = useState(formats.includes(initialFormat) ? initialFormat : "All");
  const [goal, setGoal] = useState(getGoalById(initialGoal) ? initialGoal : "All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [bestOnly, setBestOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    const selectedGoal = getGoalById(goal);

    return products
      .filter((product) => {
        const matchesCategory = category === "All" || product.category === category;
        const matchesFormat = format === "All" || product.format === format;
        const matchesGoal = !selectedGoal || selectedGoal.skus.includes(product.sku);
        const matchesBest = !bestOnly || product.label === "bestSeller" || product.label === "popular";
        const productGoals = getGoalsForSku(product.sku).map((item) => item.label).join(" ");
        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.sku.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.keyFeatures.join(" ").toLowerCase().includes(search) ||
          productGoals.toLowerCase().includes(search);

        return matchesCategory && matchesFormat && matchesGoal && matchesBest && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "reviews") return b.reviewCount - a.reviewCount;
        if (sort === "stock") return b.quantity - a.quantity;
        if (sort === "name") return a.name.localeCompare(b.name);
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        return bFeatured - aFeatured || a.number - b.number;
      });
  }, [bestOnly, category, format, goal, query, sort]);

  const activeGoal = getGoalById(goal);

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
              setGoal("All");
              setSort("featured");
              setBestOnly(false);
              setQuery("");
            }}
          >
            Reset
          </button>
        </div>

        <div className="quickGoalGrid" aria-label="Quick wellness goals">
          <button className={goal === "All" ? "isActive" : ""} type="button" onClick={() => setGoal("All")}>All</button>
          {wellnessGoals.map((item) => (
            <button className={goal === item.id ? "isActive" : ""} key={item.id} type="button" onClick={() => setGoal(item.id)}>
              {item.shortLabel}
            </button>
          ))}
        </div>

        <label className="filterToggle">
          <input type="checkbox" checked={bestOnly} onChange={(event) => setBestOnly(event.target.checked)} />
          Best sellers and popular only
        </label>

        <div className="filterGroup">
          <label htmlFor="search">Search</label>
          <input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product, SKU, benefit" />
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
        <div className="filterGroup">
          <label htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            {sortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </aside>

      <section className="catalogResults" aria-live="polite">
        <div className="catalogResultsHead">
          <p>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "product" : "products"}
          </p>
          <span>{activeGoal ? activeGoal.label : "All goals"} · {category === "All" ? "All categories" : category} · {format === "All" ? "All formats" : format}</span>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="productGrid catalogGrid">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="emptyResults">
            <h3>No products found</h3>
            <p>Try another goal, category, format, or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
