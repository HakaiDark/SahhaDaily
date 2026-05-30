import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SahhaDaily Lebanon | Premium Wellness Supplements",
  description: "Explore SahhaDaily supplements for daily wellness, beauty, immunity, energy, and active lifestyles."
};

function BrandLogo() {
  return (
    <>
      <Image
        src="/brand/sahhadaily-icon.svg"
        alt=""
        width={54}
        height={54}
        className="brandIcon"
        priority
      />
      <span className="brandWords" aria-hidden="true">
        <span className="brandLatin">Sahha<span>Daily</span></span>
        <span className="brandArabic">صحة دايلي</span>
      </span>
    </>
  );
}

function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link href="/" className="brandMark" aria-label="SahhaDaily Lebanon home">
          <BrandLogo />
        </Link>

        <nav className="navLinks desktopNav" aria-label="Primary navigation">
          <Link href="/shop">Products</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <details className="mobileMenu">
          <summary aria-label="Open menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/shop">Products</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footerGrid">
        <div>
          <Link href="/" className="brandMark" aria-label="SahhaDaily Lebanon home">
            <BrandLogo />
          </Link>
          <p style={{ marginTop: 16, maxWidth: 520 }}>
            Daily support, better you. Premium supplements for everyday wellness in Lebanon.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
