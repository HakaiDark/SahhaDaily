"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { wellnessGoals } from "@/data/merchandising";

const formatOptions = ["Any format", "Capsules", "Tablets", "Softgels", "Gummies"];

export function ProductFinder() {
  const [goalId, setGoalId] = useState(wellnessGoals[0]?.id ?? "");
  const [format, setFormat] = useState("Any format");

  const goal = wellnessGoals.find((item) => item.id === goalId) ?? wellnessGoals[0];
  const recommendations = useMemo(() => {
    if (!goal) return [];

    return goal.skus
      .map((sku) => products.find((product) => product.sku === sku))
      .filter((product) => product && (format === "Any format" || product.format === format))
      .slice(0, 3);
  }, [format, goal]);

  const shopHref = `/shop?goal=${encodeURIComponent(goal?.id ?? "")}${format === "Any format" ? "" : `&format=${encodeURIComponent(format)}`}`;

  return (
    <section className="finderSection" id="finder">
      <div className="container finderShell">
        <div>
          <span className="eyebrow">Find your routine</span>
          <h2>Not sure where to start?</h2>
          <p className="lead">
            Choose a wellness priority and we will narrow the catalog into a simple routine.
          </p>
        </div>

        <div className="finderCard">
          <div className="finderControls" role="group" aria-label="Wellness goals">
            {wellnessGoals.map((item) => (
              <button
                className={item.id === goal?.id ? "isActive" : ""}
                key={item.id}
                type="button"
                onClick={() => setGoalId(item.id)}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          <label className="finderSelect">
            Preferred format
            <select value={format} onChange={(event) => setFormat(event.target.value)}>
              {formatOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          {goal && (
            <div className="finderResult">
              <span>{goal.label}</span>
              <p>{goal.description}</p>
              <div className="finderProducts">
                {recommendations.length > 0 ? recommendations.map((product) => product && (
                  <Link key={product.sku} href={`/product/${product.slug}`}>
                    <strong>{product.name}</strong>
                    <small>{product.format} · {product.sku}</small>
                  </Link>
                )) : (
                  <p>No exact format match. Try “Any format” for this goal.</p>
                )}
              </div>
              <Link href={shopHref} className="btn btnPrimary">Shop this routine</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
