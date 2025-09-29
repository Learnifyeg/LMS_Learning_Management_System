import { Outlet } from "react-router";
import Navbar from "@/components/Landing/Navbar/Navbar";
import LandingFooter from "@/components/Landing/LandingFooter/LandingFooter";

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar */}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
