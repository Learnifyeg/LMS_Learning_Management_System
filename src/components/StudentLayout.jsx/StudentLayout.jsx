// React
import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
function StuStudentLayout() {
  const location = useLocation().pathname.split("/").pop();
  const hiddenPaths = [
    "StuCheckout",
    "StuInvoice",
    "StuQuizResult ",
    "StuShoppingCart",
    "StuQuizPage",
  ];
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

export default StuStudentLayout;
