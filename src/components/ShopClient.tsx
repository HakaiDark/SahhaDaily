"use client";

import { useMemo, useState } from "react";
import { products, categories, formats } from "@/data/products";
import { wellnessGoals, getGoalById, getGoalsForSku } from "@/data/merchandising";
import { ProductCard } from "@/components/ProductCard";

const SORTS: [string, string][] = [
  ["featured", "Featured"],
  ["rating", "Highest rated"],
  ["reviews", "Most reviewed"],
  ["stock", "Stock: high to low"],
  ["name", "A to Z"],
];

export function ShopClient({ initialCategory }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory && categories.includes(initialCategory) ? initialCategory : "All");
  const [format, setFormat] = useState("All");
  const [goal, setGoal] = useState("All");
  const [sort, setSort] = useState("featured");
  const [q, setQ] = useState("");
  const [best, setBest] = useState(false);
  const activeGoal = goal === "All" ? undefined : getGoalById(goal);

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    return products
      .filter((p) => {
        const mc = category === "All" || p.category === category;
        const mf = format === "All" || p.format === format;
        const mg = !activeGoal || activeGoal.skus.includes(p.sku);
        const mb = !best || p.label === "bestSeller" || p.label === "popular";
        const gtxt = getGoalsForSku(p.sku).map((x) => x.label).join(" ").toLowerCase();
        const ms = !search ||
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.keyFeatures.join(" ").toLowerCase().includes(search) ||
          gtxt.includes(search);
        return mc && mf && mg && mb && ms;
      })
      .sort((a, b) => {
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "reviews") return b.reviewCount - a.reviewCount;
        if (sort === "stock") return b.quantity - a.quantity;
        if (sort === "name") return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.number - b.number;
      });
  }, [category, format, goal, sort, q, best, activeGoal]);

  const reset = () => { setCategory("All"); setFormat("All"); setGoal("All"); setSort("featured"); setBest(false); setQ(""); };

  return (
    <div className="shop-layout">
      <aside className="filters">
        <div className="fh"><h3>Filter</h3><button className="reset" onClick={reset}>Reset</button></div>
        <div className="quickgoals">
          <button className={goal === "All" ? "on" : ""} onClick={() => setGoal("All")}>All</button>
          {wellnessGoals.map((x) => (
            <button key={x.id} className={goal === x.id ? "on" : ""} onClick={() => setGoal(x.id)}>{x.shortLabel}</button>
          ))}
        </div>
        <label className="ftoggle">
          <input type="checkbox" checked={best} onChange={(e) => setBest(e.target.checked)} />
          Best sellers &amp; popular only
        </label>
        <div className="field"><label>Search</label><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Product, SKU, benefit" /></div>
        <div className="field"><label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>{categories.map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div className="field"><label>Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option>All</option>{formats.map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div className="field"><label>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </aside>
      <section aria-live="polite">
        <div className="cat-results-head">
          <p><strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</p>
          <span>{(activeGoal ? activeGoal.label : "All goals") + " · " + (category === "All" ? "All categories" : category) + " · " + (format === "All" ? "All formats" : format)}</span>
        </div>
        {filtered.length ? (
          <div className="pgrid cols3">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty">
            <h3 className="h-md">No products found</h3>
            <p className="lead" style={{ marginInline: "auto", marginTop: 10 }}>Try another goal, category, format, or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}
