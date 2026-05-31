"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroMotion() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 34]);
  const cardOneY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, -18]);
  const cardTwoY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 22]);

  return (
    <div className="heroVisual" aria-hidden="true">
      <motion.div className="heroImageWrap motion-safe" style={{ y: imageY }}>
        <Image
          src="/brand/hero-products.jpg"
          alt="SahhaDaily wellness supplements"
          width={1000}
          height={1000}
          priority
          sizes="(max-width: 980px) 100vw, 50vw"
        />
      </motion.div>
      <motion.div className="floatCard floatOne motion-safe" style={{ y: cardOneY }}>
        Delivered in Lebanon
        <small>free shipping on orders above X</small>
      </motion.div>
      <motion.div className="floatCard floatTwo motion-safe" style={{ y: cardTwoY }}>
        Science-backed
        <small>quality-verified formulas</small>
      </motion.div>
    </div>
  );
}
