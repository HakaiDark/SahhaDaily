"use client";

import { useEffect, useRef, useState } from "react";

export function StickyOrderBar({
  name,
  price,
  href
}: {
  name: string;
  price: string;
  href: string;
}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show only once the main buy button has scrolled out of view above us.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <div className={`productStickyOrder ${visible ? "isVisible" : ""}`} aria-label="Quick order bar">
        <div className="container stickyOrderInner">
          <span>{name} · {price}</span>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btnPrimary">
            Order On WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
