import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";
import { waLink } from "@/data/contact";
import "./globals.css";

export const metadata: Metadata = {
  title: "SahhaDaily | Premium Wellness Supplements",
  description: "Explore SahhaDaily supplements for daily wellness, beauty, immunity, energy, and active lifestyles."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

const urgencyMessages = [
  "🚚 Free Delivery On Qualifying Orders · توصيل مجاني",
  "🇬🇧 Directly Sourced From WeightWorld UK · بضاعة أصلية من بريطانيا",
  "✅ Verified Originals Only · منتجات أصلية مضمونة 100%",
  "💬 Order On WhatsApp — Fast And Easy · اطلب على واتساب",
];

function UrgencyBanner() {
  return (
    <div className="urgencyBanner" aria-hidden="true">
      <div className="urgencyTrack">
        {[...urgencyMessages, ...urgencyMessages].map((msg, i) => (
          <span key={i} className="urgencyItem">{msg}</span>
        ))}
      </div>
    </div>
  );
}

function WhatsAppBubble() {
  return (
    <a
      {...waLink("Hi SahhaDaily! 🌿 I'd like to browse your products")}
      className="waBubble"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

function BrandLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/sahhadaily-logo.png"
      alt="SahhaDaily — Daily Support, Better You"
      width={779}
      height={320}
      className="brandLockup"
    />
  );
}

function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link href="/" className="brandMark" aria-label="SahhaDaily home">
          <BrandLogo />
        </Link>

        <nav className="navLinks desktopNav" aria-label="Primary navigation">
          <Link href="/shop">Products</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#experts">Experts</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <details className="mobileMenu">
          <summary aria-label="Open menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/shop">Products</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/#experts">Experts</Link>
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
          <Link href="/" className="brandMark" aria-label="SahhaDaily home">
            <BrandLogo />
          </Link>
          <p style={{ marginTop: 16, maxWidth: 520 }}>
            Daily Support, Better You. Premium Supplements For Everyday Wellness.
          </p>
        </div>
        <div className="footerContact">
          <p className="footerColTitle">Get In Touch</p>
          <p className="footerContactLead">
            Order or ask a question — our team replies fast on WhatsApp.
          </p>
          <a
            className="footerWaBtn"
            {...waLink("Hi SahhaDaily! 🌿 I have a question")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat On WhatsApp
          </a>
          <ul className="footerContactList">
            <li>
              <a href="https://instagram.com/sahhadaily" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
                @sahhadaily
              </a>
            </li>
            <li className="footerHours">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mon–Sat · 9:00 – 19:00
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        <ComingSoon />
        <UrgencyBanner />
        <Header />
        {children}
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
