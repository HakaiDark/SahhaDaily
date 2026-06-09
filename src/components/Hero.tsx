"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { ArrowIcon } from "./icons";

const slides = products.slice(0, 10);
const list = slides.length ? slides : products.slice(0, 4);

export function Hero() {
  const [idx, setIdx] = useState(0);
  const pausedRef = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    list.forEach((s) => { const im = new Image(); im.src = s.image; });
  }, []);
  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => {
      if (!pausedRef.current) setIdx((i) => (i + 1) % list.length);
    }, 4600);
    return () => clearInterval(t);
  }, []);

  const cur = list[idx];
  return (
    <section className="hx">
      <span className="hx-orb a" />
      <span className="hx-orb b" />
      <div className="wrap-wide hx-grid">
        <div className="hx-copy">
          <h1 className="hx-title">Premium<br />Wellness<br /><span className="it">Supplements</span></h1>
          <span className="hx-sep" aria-hidden="true" />
          <p className="hx-ar ar">صحتك <span className="o">بالديني</span></p>
          <p className="hx-tagline">Daily support, <span className="it">better you</span> 🌿</p>
          <p className="lead hx-sub">Premium wellness supplements for energy, beauty, immunity and active living, sourced from Europe and delivered to your door.</p>
          <div className="hx-cta">
            <Link className="btn accent" href="/shop"><span>Shop products<ArrowIcon width={17} height={17} /></span></Link>
            <Link className="btn ghost" href="/#experts"><span>Talk to an expert</span></Link>
          </div>
        </div>
        <div
          className="hx-visual"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div className="hx-prod" style={{ perspective: "900px" }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={cur.sku}
                src={cur.image}
                alt={cur.name}
                initial={reduce ? false : { opacity: 0, y: 22, scale: 0.86, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="hx-pill p1">
            <span className="ic">★</span>
            <span className="tx"><b>{cur.rating} rating</b><span>{cur.reviewCount} reviews</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
