import { lazy, Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { SidebarProvider, useSidebar } from "@/components/ui/Sidebar/sidebar";

const Navbar = lazy(() => import("@/components/SideNavbar/Navbar"));
const Footer = lazy(() => import("../Footer/Footer"));
import LogoModes from "../ui/LogoTheme/LogoModes";

function LayoutContent({ shouldHide }) {
  const { open } = useSidebar(); // ✅ Now it's inside the provider
  const userRole = localStorage.getItem("role") || "student";

  return (
    <>
      <Suspense fallback={null}>
        <Navbar role={userRole} />
      </Suspense>

      <div
        className={`transition-all duration-300 mt-16 ${
          open ? "ml-56" : "mx-auto"
        } max-md:ml-5`}
      >
        <Outlet />
        {!shouldHide && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </>
  );
}

function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/").pop();
  const hiddenPaths = ["AboutUs", "ContactUs", "SearchResults ", "TermsofUse"];
  const shouldHide = hiddenPaths.includes(location);

  return (
    <>
      {shouldHide ? (
        <div>
          <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-[#0a0e19] flex items-center justify-between px-6 shadow-sm z-50">
            <button
              className="btn-secondary btn-hover transition"
              onClick={() => navigate("/UserLayout")}
            >
              Back To Dashboard
            </button>

            <div className="mt-5 max-sm:w-32">
              <LogoModes />
            </div>

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu_Bwn9_9Uvdpq3DYMfWGtIFiKg6jchz2MOw&s"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => navigate("/UserLayout")}
            />
          </header>
          <Outlet />
        </div>
      ) : (
        <SidebarProvider>
          <LayoutContent shouldHide={shouldHide} />
        </SidebarProvider>
      )}
    </>
  );
}

export default UserLayout;
