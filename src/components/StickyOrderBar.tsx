"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "@/data/contact";

export function StickyOrderBar({
  name,
  message
}: {
  name: string;
  message: string;
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
          <span>{name}</span>
          <a {...waLink(message)} className="btn btnPrimary">
            Order On WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
