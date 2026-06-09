"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const pics = images.length ? images : [];
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  const active = pics[idx] ?? pics[0];
  const hasMany = pics.length > 1;
  // The background-removed packshot is a floating cut-out; the rest are full-bleed creatives.
  const isCutout = (src: string) => src.includes("/immersive/");

  return (
    <div className="pdx-gallery">
      <div className={"pdx-media " + (isCutout(active) ? "is-cutout" : "is-scene")}>
        <AnimatePresence mode="popLayout" initial={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={active}
            src={active}
            alt={name}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </AnimatePresence>
      </div>
      {hasMany && (
        <div className="pdx-thumbs" aria-label={`${name} images`}>
          {pics.map((src, i) => (
            <button
              key={src}
              type="button"
              className={"pdx-thumb " + (isCutout(src) ? "is-cutout" : "is-scene") + (i === idx ? " on" : "")}
              aria-label={`Show ${name} image ${i + 1}`}
              aria-pressed={i === idx}
              onClick={() => setIdx(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
