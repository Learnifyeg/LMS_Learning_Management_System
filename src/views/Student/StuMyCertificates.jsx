// React
import { lazy, Suspense } from "react";

// Lazy imports
const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

function MyCertificates() {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      {/* Page Content Here */}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default MyCertificates;
