// React
import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar/sidebar";
function AdminLayout() {
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
    </>
  );
}

export default AdminLayout;
