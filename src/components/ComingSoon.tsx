import { InstaIcon } from "./icons";

/** Slim pre-launch announcement bar shown at the very top of the page. */
export function ComingSoon() {
  return (
    <aside className="cs-bar" aria-label="Launch announcement">
      <span className="cs-shimmer" aria-hidden="true" />
      <div className="wrap-wide cs-inner">
        <span className="cs-badge"><span className="cs-dot" aria-hidden="true" />Coming Soon</span>
        <p className="cs-copy">SahhaDaily Is Launching Soon<span>صحتك بالديني 🌿</span></p>
        <a className="cs-cta" href="https://instagram.com/sahhadaily" target="_blank" rel="noopener noreferrer"><InstaIcon />Follow Along</a>
      </div>
    </aside>
  );
}
