"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons";

const LINKS = [
  { label: "Products", href: "/shop" },
  { label: "Categories", href: "/#categories" },
  { label: "Experts", href: "/#experts" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <div className="wrap-wide hdr-in">
          <Link href="/" aria-label="SahhaDaily home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-img" src="/brand/sahhadaily-logo.png" alt="SahhaDaily" />
          </Link>
          <nav className="nav" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <div className="hdr-actions">
            <button className="icon-btn menu-toggle" onClick={() => setMenu(true)} aria-label="Menu"><MenuIcon /></button>
          </div>
        </div>
      </header>
      <div className={"mnav" + (menu ? " open" : "")}>
        <button className="mnav-close" onClick={() => setMenu(false)} aria-label="Close"><CloseIcon /></button>
        {LINKS.map((l) => (
          <Link key={l.label} href={l.href} onClick={() => setMenu(false)}>{l.label}</Link>
        ))}
        <div className="mnav-ar">صحتك بالديني 🌿</div>
      </div>
    </>
  );
}
