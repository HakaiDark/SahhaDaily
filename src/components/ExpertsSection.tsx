"use client";

import { useEffect, useState } from "react";
import { experts } from "@/data/experts";
import { waLink } from "@/data/contact";
import { ArrowIcon, CloseIcon, WaIcon } from "./icons";

const AVATAR_BG: Record<string, string> = {
  "sara-shehab": "linear-gradient(150deg,#2E5B3F,#1C3C2A)",
  "tharwat": "linear-gradient(150deg,#E0744A,#C45D34)",
  "sara-mohyeldine": "linear-gradient(150deg,#A7C49A,#2E5B3F)",
};

const initials = (name: string) =>
  name.replace(/^(Dr\.|Msc\.|Mr\.|Mrs\.|Ms\.)\s*/i, "").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export function ExpertsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ex = openId ? experts.find((e) => e.id === openId) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    if (openId) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [openId]);

  return (
    <section className="sec tone-mint" id="experts">
      <div className="wrap-wide">
        <div className="intro">
          <span className="kicker">Meet the panel</span>
          <h2 className="h-lg">Real experts, <span className="accent it">real guidance.</span></h2>
          <p className="lead">Every product we carry is reviewed by an independent panel of specialists across Europe and Lebanon.</p>
        </div>
        <div className="exgrid">
          {experts.map((e) => (
            <button className="excard" key={e.id} id={`expert-${e.id}`} onClick={() => setOpenId(e.id)}>
              <div className="ex-av" style={{ background: AVATAR_BG[e.id] }}>{initials(e.name)}</div>
              <span className="ex-region">{e.flag} {e.region}</span>
              <h3>{e.name}</h3>
              <span className="ex-role">{e.role}</span>
              <span className="ex-readbio">Read biography<ArrowIcon width={16} height={16} /></span>
            </button>
          ))}
        </div>
      </div>

      <div className={"exmodal-overlay" + (ex ? " open" : "")} onClick={() => setOpenId(null)} />
      <div className={"exmodal" + (ex ? " open" : "")} role="dialog" aria-modal="true" aria-hidden={!ex}>
        {ex && (
          <div className="exmodal-inner">
            <button className="exmodal-close" onClick={() => setOpenId(null)} aria-label="Close"><CloseIcon /></button>
            <div className="exmodal-head">
              <div className="ex-av lg" style={{ background: AVATAR_BG[ex.id] }}>{initials(ex.name)}</div>
              <div>
                <span className="ex-region">{ex.flag} {ex.region}</span>
                <h3>{ex.name}</h3>
                <span className="ex-role">{ex.role}</span>
              </div>
            </div>
            <p className="exmodal-bio">{ex.bio}</p>
            <a className="btn accent full" {...waLink(`Hi SahhaDaily! I'd like to ask ${ex.name.split(" ")[0]} a question`)}>
              <span><WaIcon width={18} height={18} />Ask {ex.name.split(" ")[0]} on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
