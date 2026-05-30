import { Suspense } from "react";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata = {
  title: "Shop | SahhaDaily Lebanon"
};

export default function ShopPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Product catalog</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 5.1rem)", marginBottom: 0 }}>Shop supplements</h1>
          </div>
          <p className="lead">
            Browse SahhaDaily products by category and format.
          </p>
        </div>
        <Suspense fallback={<p>Loading products...</p>}>
          <ShopFilters />
        </Suspense>
      </div>
    </main>
  );
}
