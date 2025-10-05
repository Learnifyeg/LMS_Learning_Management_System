// React
import { lazy, Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

// Lazy imports
const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar/sidebar";
import LogoModes from "../ui/LogoTheme/LogoModes";
function StuStudentLayout() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/").pop();
  const hiddenPaths = [
    "StuCheckout",
    "StuInvoice",
    "StuQuizResult",
    "StuShoppingCart",
    "StuQuizPage",
  ];
  const shouldHide = hiddenPaths.includes(location);
  return (
    <>
      {shouldHide ? (
        <div>
          <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-stone-900 flex items-center justify-between px-6 shadow-sm z-50">
            <button
              className="btn-secondary  btn-hover transition"
              onClick={() => navigate("/StudentLayout/StuDashboard")}
            >
              Back To Dashboard
            </button>

            <div className="mt-5 max-sm:w-32">
              <LogoModes />
            </div>

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu_Bwn9_9Uvdpq3DYMfWGtIFiKg6jchz2MOw&s"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover  cursor-pointer"
              onClick={() => navigate("/StudentLayout/StuProfile")}
            />
          </header>
          <Outlet />
        </div>
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
      )}
    </>
  );
}

export default StuStudentLayout;
