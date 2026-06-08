"use client";

/* Nature system — gradient botanicals.
   Ported from the editorial mockup. All decorative, aria-hidden, behind content.
   Each SVG uses useId() so its <defs> gradient ids stay unique & SSR-safe. */

import { useId } from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

/* eucalyptus / rounded-leaflet frond */
export function Frond(props: SvgProps) {
  const g = useId();
  const leaf = (cx: number, cy: number, rot: number, sc: number) => (
    <ellipse
      key={`${cx}-${cy}`}
      cx={0}
      cy={0}
      rx={13 * sc}
      ry={17 * sc}
      fill={`url(#${g})`}
      transform={`translate(${cx} ${cy}) rotate(${rot})`}
      opacity="0.95"
    />
  );
  const items: React.ReactNode[] = [];
  for (let i = 0; i < 7; i++) {
    const t = i / 7;
    const y = 26 + t * 190;
    const sc = 1 - t * 0.45;
    items.push(leaf(80 - 20 * (1 - t), y, -42, sc));
    items.push(leaf(80 + 20 * (1 - t), y, 42, sc));
  }
  return (
    <svg viewBox="0 0 160 240" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet" {...props}>
      <defs>
        <radialGradient id={g} cx="0.4" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#A7C49A" />
          <stop offset="1" stopColor="#3E6B47" />
        </radialGradient>
      </defs>
      <path d="M80 238 C80 180 80 90 80 14" stroke="#3E6B47" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      {items}
      <circle cx="80" cy="16" r="5" fill={`url(#${g})`} />
    </svg>
  );
}

/* trailing vine with small teardrop leaves */
export function Vine(props: SvgProps) {
  const g = useId();
  const leaf = (x: number, y: number, rot: number) => (
    <path
      key={`${x}-${y}`}
      d="M0 0 C-3 -9 -1 -19 8 -25 C15 -18 15 -8 8 0 C5 3 2 3 0 0 Z"
      fill={`url(#${g})`}
      transform={`translate(${x} ${y}) rotate(${rot})`}
    />
  );
  const pts: React.ReactNode[] = [];
  for (let i = 0; i < 9; i++) {
    const t = i / 9;
    const x = 30 + Math.sin(t * 6.2) * 26;
    const y = 12 + t * 220;
    pts.push(leaf(x, y, i % 2 ? 40 : -130));
  }
  return (
    <svg viewBox="0 0 90 250" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet" {...props}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FB57A" />
          <stop offset="1" stopColor="#2E5B3F" />
        </linearGradient>
      </defs>
      <path
        d="M30 8 C56 50 4 90 30 130 C56 170 4 210 30 248"
        stroke="#3E6B47"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {pts}
    </svg>
  );
}

/* olive branch, gradient */
export function Olive(props: SvgProps) {
  const g = useId();
  const leaf = (cx: number, cy: number, rot: number) => (
    <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="5.5" ry="16" fill={`url(#${g})`} transform={`rotate(${rot} ${cx} ${cy})`} />
  );
  return (
    <svg viewBox="0 0 260 120" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet" {...props}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9CBE8B" />
          <stop offset="1" stopColor="#3E6B47" />
        </linearGradient>
      </defs>
      <path d="M6 96 C70 70 150 58 254 38" stroke="#3E6B47" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
      {leaf(50, 80, -28)}
      {leaf(58, 96, 38)}
      {leaf(96, 70, -24)}
      {leaf(104, 86, 34)}
      {leaf(146, 62, -22)}
      {leaf(154, 78, 30)}
      {leaf(196, 54, -18)}
      {leaf(204, 70, 26)}
      <circle cx="78" cy="90" r="6" fill="#7B9A5C" />
      <circle cx="172" cy="70" r="6" fill="#5C7A3E" />
    </svg>
  );
}
