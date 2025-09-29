// React
import { lazy, Suspense } from "react";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

function StuDashboard() {
  return (
    <>
      {/* <div className="ml-[250px]"> */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {/* Page Content Here */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      {/* </div> */}
    </>
  );
}

export default StuDashboard;
