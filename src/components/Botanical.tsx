import type { CSSProperties } from "react";

/**
 * File-free botanical line-art decorations.
 * All shapes use `currentColor` so tint + opacity are controlled from CSS.
 * Every decoration is purely ornamental: aria-hidden + non-interactive.
 */

type DecorProps = {
  className?: string;
  style?: CSSProperties;
};

const base: CSSProperties = { pointerEvents: "none" };

/* Fern frond — delicate line art with generated pinnae. */
export function Fern({ className, style }: DecorProps) {
  const pinnae = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    return {
      y: 190 - t * 178,
      len: 30 * (1 - t * 0.62),
      droop: 9 * (1 - t * 0.4),
    };
  });
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 130 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M65 197 C 60 140 62 78 67 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {pinnae.map((p, i) => (
        <g key={i}>
          <path
            d={`M65 ${p.y} C ${65 - p.len * 0.55} ${p.y - 1} ${65 - p.len} ${p.y + p.droop} ${65 - p.len - 1} ${p.y + p.droop + 5}`}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d={`M66 ${p.y} C ${66 + p.len * 0.55} ${p.y - 1} ${66 + p.len} ${p.y + p.droop} ${66 + p.len + 1} ${p.y + p.droop + 5}`}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/* Climbing ivy vine — curving stem with alternating leaves. */
export function Vine({ className, style }: DecorProps) {
  const leaf = "M0 -9 C 7 -5 7 6 0 10 C -7 6 -7 -5 0 -9 Z";
  const nodes = [
    { x: 22, y: 26, r: -26 },
    { x: 41, y: 58, r: 32 },
    { x: 26, y: 96, r: -34 },
    { x: 50, y: 134, r: 38 },
    { x: 33, y: 172, r: -22 },
    { x: 47, y: 202, r: 30 },
  ];
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 90 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 4 C 50 36 16 74 42 110 C 64 142 28 168 40 216"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {nodes.map((n, i) => (
        <path
          key={i}
          d={leaf}
          transform={`translate(${n.x} ${n.y}) rotate(${n.r})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/* Eucalyptus sprig — central stem with paired rounded leaves. */
export function Sprig({ className, style }: DecorProps) {
  const leaf = "M0 0 C 9 -4 17 -2 20 4 C 14 8 4 7 0 0 Z";
  const pairs = Array.from({ length: 6 }, (_, i) => ({
    y: 24 + i * 27,
    s: 1 - i * 0.09,
  }));
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 130 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M65 196 C 62 134 64 72 65 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {pairs.map((p, i) => (
        <g key={i} transform={`translate(65 ${p.y})`}>
          <path d={leaf} transform={`rotate(-22) scale(${p.s})`} fill="currentColor" />
          <path d={leaf} transform={`rotate(-22) scale(${-p.s} ${p.s})`} fill="currentColor" />
        </g>
      ))}
      <circle cx="65" cy="8" r="2.4" fill="currentColor" />
    </svg>
  );
}

/* Olive branch — horizontal stem with pointed leaves and a few olives. */
export function OliveBranch({ className, style }: DecorProps) {
  const leaf = "M0 0 C 11 -7 28 -5 37 1 C 26 7 9 8 0 0 Z";
  const nodes = [
    { x: 40, y: 30, r: -18, s: 1 },
    { x: 78, y: 34, r: 16, s: 0.95 },
    { x: 118, y: 28, r: -20, s: 0.9 },
    { x: 158, y: 33, r: 14, s: 0.82 },
  ];
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 220 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 32 C 70 26 150 26 214 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {nodes.map((n, i) => (
        <path
          key={i}
          d={leaf}
          transform={`translate(${n.x} ${n.y}) rotate(${n.r}) scale(${n.s})`}
          fill="currentColor"
        />
      ))}
      <circle cx="60" cy="40" r="3.4" fill="currentColor" opacity="0.8" />
      <circle cx="138" cy="40" r="3.4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/* Single elegant leaf with a midrib — accent mark. */
export function Leaf({ className, style }: DecorProps) {
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path d="M50 6 C 80 28 80 72 50 96 C 20 72 20 28 50 6 Z" fill="currentColor" />
      <path
        d="M50 14 L50 88 M50 38 L66 30 M50 38 L34 30 M50 58 L68 52 M50 58 L32 52"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Cedar of Lebanon ──────────────────────────────────────────────
   The national tree: a tiered silhouette of horizontal foliage layers
   on a short trunk. Drawn in base-origin coords (base at 0,0, growing
   up) so a single tree and a treeline can share one glyph. */
function lens(w: number, h: number, yc: number) {
  const cx = (k: number) => (w * k).toFixed(1);
  return `M${-w} ${yc} C ${cx(-0.42)} ${yc - h} ${cx(0.42)} ${yc - h} ${w} ${yc} C ${cx(0.42)} ${yc + h} ${cx(-0.42)} ${yc + h} ${-w} ${yc} Z`;
}

const CEDAR_TIERS = [
  { w: 50, h: 11, yc: -22 },
  { w: 40, h: 10, yc: -40 },
  { w: 30, h: 9, yc: -58 },
  { w: 21, h: 8, yc: -74 },
  { w: 13, h: 7, yc: -88 },
];

function CedarGlyph() {
  return (
    <g>
      <rect x="-3.5" y="-20" width="7" height="22" rx="2" fill="currentColor" />
      {CEDAR_TIERS.map((t, i) => (
        <path key={i} d={lens(t.w, t.h, t.yc)} fill="currentColor" />
      ))}
      <path d="M0 -96 C 5 -104 5 -110 0 -118 C -5 -110 -5 -104 0 -96 Z" fill="currentColor" />
    </g>
  );
}

/* Single cedar tree. */
export function Cedar({ className, style }: DecorProps) {
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 120 140"
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(60 132)">
        <CedarGlyph />
      </g>
    </svg>
  );
}

/* Cedar ridge — a mountain treeline of cedars at varied heights. */
export function CedarRidge({ className, style }: DecorProps) {
  const trees = [
    { x: 44, s: 0.6 },
    { x: 128, s: 0.94 },
    { x: 224, s: 0.72 },
    { x: 330, s: 1.08 },
    { x: 436, s: 0.68 },
    { x: 532, s: 0.9 },
    { x: 626, s: 0.56 },
  ];
  return (
    <svg
      className={className}
      style={{ ...base, ...style }}
      viewBox="0 0 690 150"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x} 148) scale(${t.s})`}>
          <CedarGlyph />
        </g>
      ))}
    </svg>
  );
}

/* Botanical section divider — fading rule with a small centered cedar. */
export function BotanicalDivider({ className }: { className?: string }) {
  return (
    <div className={`botanicalDivider ${className ?? ""}`.trim()} aria-hidden="true">
      <span className="bdLine" />
      <svg className="bdMark" viewBox="0 0 60 46" fill="none">
        <g transform="translate(30 44) scale(0.34)">
          <CedarGlyph />
        </g>
      </svg>
      <span className="bdLine" />
    </div>
  );
}
