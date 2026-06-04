import type { AnchorHTMLAttributes } from "react";

/**
 * Central WhatsApp config. The real number isn't live yet, so every
 * WhatsApp link/button is rendered INERT (no href → clicking does nothing).
 *
 * To go live later: set WHATSAPP_NUMBER (international format, no "+" or
 * spaces, e.g. "9611234567") and flip WHATSAPP_ENABLED to true.
 */
export const WHATSAPP_NUMBER = "";
export const WHATSAPP_ENABLED = false;

/** Anchor props for a WhatsApp link. While disabled it returns no href,
 *  so the element stays visible but does not navigate anywhere. */
export function waLink(message?: string): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!WHATSAPP_ENABLED || !WHATSAPP_NUMBER) {
    return { "aria-disabled": true };
  }
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return {
    href: `https://wa.me/${WHATSAPP_NUMBER}${query}`,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}
