// React
import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { SidebarProvider } from "../ui/Sidebar/sidebar";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));
function UserLayout() {
  const location = useLocation().pathname.split("/").pop();
  const hiddenPaths = ["AboutUs", "ContactUs", "SearchResults ", "TermsofUse"];
  const shouldHide = hiddenPaths.includes(location);
  return (
    <>
      {shouldHide ? (
        <Outlet />
      ) : (
        <SidebarProvider>
          {!shouldHide && (
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
          )}

          <div className="ml-56 max-md:ml-5 mt-16">
            <Outlet />
            {!shouldHide && (
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            )}{" "}
          </div>
        </SidebarProvider>
      )}igt
    </>
  );
}

export default UserLayout;
