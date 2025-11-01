import { Button } from "../../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLinks } from "@/assets/Constants/NavLinks";
import LogoNav from "../../ui/Logo/LogoNav";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("Role");
  const handleAccountClick = () => {
    if (userRole === "student") {
      navigate("/StudentLayout");
    } 
    else if (userRole === "instructor") {
      navigate("/InstructorLayout");
    } else if (userRole === "admin") {
      navigate("/AdminLayout");
    }
  };
   const handleLogout = () => {
    localStorage.removeItem("useremail"); // remove user from localStorage
    localStorage.removeItem("token"); // optional, if you saved token separately
    localStorage.removeItem("username"); // optional, if you saved token separately
    localStorage.removeItem("userid"); // optional, if you saved token separately
    localStorage.removeItem("Role"); // optional, if you saved token separately
    navigate("/");
    window.location.reload(); // refresh UI to reflect logout
  };


  return (
    <header className="bg-primary/90 py-3 text-white sticky top-0 z-50 backdrop-blur-md">
      <div className="flex justify-between items-center custom-container">
        <LogoNav />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            {NavLinks.map((link) => (
              <NavigationMenuItem
                key={link.name}
                className="hover:-translate-y-0.25 transition-all duration-300 ease-in-out font-bold"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-all hover:text-text-primary duration-300 ease-in-out ${
                      isActive
                        ? "text-text-primary bg-primary/90 rounded-md px-3 py-2"
                        : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="gap-2 flex">
          {!userRole ? (
            <>
              <Button
                variant="outline"
                className="bg-transparent cursor-pointer hover:-translate-y-0.25 transition-all duration-300 ease-in-out"
                onClick={() => navigate("/User/Login")}
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                className="bg-secondary cursor-pointer hover:-translate-y-0.25 transition-all duration-300 ease-in-out"
                onClick={() => navigate("/User/Register")}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="bg-secondary cursor-pointer hover:-translate-y-0.25 transition-all duration-300 ease-in-out"
                onClick={handleAccountClick}
              >
                My Account
              </Button>
              <Button
                variant="outline"
                className="bg-transparent cursor-pointer hover:-translate-y-0.25 transition-all duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
