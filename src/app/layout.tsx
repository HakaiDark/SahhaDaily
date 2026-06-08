import type { Metadata, Viewport } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ParticleField } from "@/components/Botanical";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        <ParticleField />
        <ComingSoon />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
