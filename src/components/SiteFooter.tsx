import Link from "next/link";
import { waLink } from "@/data/contact";
import { WaIcon, InstaIcon, PinIcon, ChatIcon } from "./icons";
import { Frond, Olive } from "./Botanical";

export function SiteFooter() {
  return (
    <footer className="ftr" id="contact">
      <div className="ftr-deco botany sway-slow" style={{ top: -30, right: "3%", width: 150, height: 230 }}>
        <Frond />
      </div>
      <div className="ftr-deco drift" style={{ bottom: 80, left: "-2%", width: 240, height: 110, opacity: 0.4 }}>
        <Olive />
      </div>
      <div className="wrap-wide">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Link href="/" aria-label="SahhaDaily home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/sahhadaily-logo.png" alt="SahhaDaily" />
            </Link>
            <p className="ftr-tag">Daily support, better you. Premium supplements for everyday wellness, sourced from Europe and delivered to your door.</p>
            <p className="ar">صحتك بالديني 🌿</p>
          </div>
          <div>
            <p className="ftr-col-t">Explore</p>
            <ul className="ftr-links">
              <li><Link href="/shop">All products</Link></li>
              <li><Link href="/#categories">Categories</Link></li>
              <li><Link href="/#experts">Our experts</Link></li>
              <li><Link href="/#about">About Sahha</Link></li>
            </ul>
          </div>
          <div className="ftr-contact">
            <h4>Get in touch</h4>
            <p>Order or ask a question, and our team replies fast every day over WhatsApp.</p>
            <div className="ftr-info">
              <div className="ftr-info-row">
                <span className="ftr-info-ic"><PinIcon /></span>
                <span><b>Based in Lebanon</b><small>West Bekaa · Al Qaraoun</small></span>
              </div>
              <div className="ftr-info-row">
                <span className="ftr-info-ic"><ChatIcon /></span>
                <span><b>Fast replies</b><small>Usually within the hour, every day</small></span>
              </div>
            </div>
            <a className="ftr-wa" {...waLink("Hi SahhaDaily! 🌿 I have a question")}><WaIcon />Chat on WhatsApp</a>
            <a className="ftr-ig" href="https://instagram.com/sahhadaily" target="_blank" rel="noopener noreferrer"><InstaIcon />Follow @sahhadaily</a>
          </div>
        </div>
        <div className="ftr-bar"><span>@SahhaDaily</span></div>
      </div>
    </footer>
  );
}
