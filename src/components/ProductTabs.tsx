"use client";

import { useState } from "react";
import type { Product } from "@/data/products";

const TABS = [
  ["how", "How to use"],
  ["ingredients", "Ingredients"],
  ["nutrition", "Nutrition"],
] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<string>("how");
  return (
    <div className="pdx-tabs">
      <div className="tabbar">
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      {tab === "how" && (
        <div className="tabpane">
          <div>
            <p>{product.howToUse}</p>
            {product.whyUse.length > 0 && (
              <ul className="checklist" style={{ marginTop: 18 }}>{product.whyUse.map((r) => <li key={r}>{r}</li>)}</ul>
            )}
          </div>
        </div>
      )}
      {tab === "ingredients" && (
        <div className="tabpane">
          <div>
            <p>{product.ingredients}</p>
            <p style={{ marginTop: 16, fontSize: "0.9rem", color: "var(--muted)" }}>{product.safety}</p>
          </div>
        </div>
      )}
      {tab === "nutrition" && (
        <div className="tabpane">
          <ul className="checklist">{product.nutritionalInfo.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
