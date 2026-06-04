"use client";

import { useEffect, useState } from "react";

/**
 * Pre-launch announcement banner shown at the very top of every page.
 * The rest of the site stays fully browsable below it.
 *
 * No launch date yet — it cycles short teaser phrases to build anticipation.
 * When you go live, simply remove <ComingSoon /> from layout.tsx.
 */
const PHRASES = [
  "Premium Wellness — On Its Way",
  "European Quality · Lebanese Heart",
  "Daily Support, Better You",
  "Get Ready To Feel The Difference",
];

export function ComingSoon() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="comingSoon" aria-label="Launch announcement">
      <span className="comingSoonShimmer" aria-hidden="true" />
      <div className="container comingSoonInner">
        <span className="comingSoonBadge">
          <span className="csDot" aria-hidden="true" />
          Coming Soon
        </span>

        <p className="comingSoonCopy">
          <strong>SahhaDaily Is Launching Soon</strong>
          <span>Be the first to feel the difference — صحتك بالديني 🌿</span>
        </p>

        {/* Rotating teaser — replaces a hard countdown since the date isn't set. */}
        <span className="comingSoonTeaser" aria-live="polite">
          <span key={index} className="csTeaserText">✨ {PHRASES[index]}</span>
        </span>

        <a
          className="comingSoonCta"
          href="https://instagram.com/sahhadaily"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow Along →
        </a>
      </div>
    </aside>
  );
}
