// React
import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));
function UserLayout() {
  const location = useLocation().pathname.split("/").pop();
  const hiddenPaths = ["AboutUs", "ContactUs", "SearchResults ", "TermsofUse"];
  const shouldHide = hiddenPaths.includes(location);
  return (
    <>
      {!shouldHide && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}

      <Outlet />

      {!shouldHide && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}

export default UserLayout;
