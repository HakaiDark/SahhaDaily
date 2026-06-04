"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { wellnessGoals } from "@/data/merchandising";
import { experts } from "@/data/experts";

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
          <span className="eyebrow">Find Your Routine</span>
          <h2>Not Sure Where To <span className="hl">Start?</span></h2>
          <p className="lead">
            Choose A Wellness Priority And We Will Narrow The Catalog Into A Simple Routine.
          </p>

          <div className="finderExperts">
            <span className="finderExpertsLabel">Talk To One Of Our Experts</span>
            <ul>
              {experts.map((expert) => (
                <li key={expert.id}>
                  <Link href={`/#expert-${expert.id}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={expert.avatar} alt={expert.name} width={44} height={44} loading="lazy" />
                    <span className="finderExpertText">
                      <strong>{expert.name}</strong>
                      <small>{expert.flag} {expert.region} · {expert.role}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
            Preferred Format
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
                  <p>No Exact Format Match. Try “Any Format” For This Goal.</p>
                )}
              </div>
              <Link href={shopHref} className="btn btnPrimary">Shop This Routine</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
