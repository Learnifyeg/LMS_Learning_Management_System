import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLinks } from "@/assets/Constants/NavLinks";
import LogoNav from "../ui/Logo/LogoNav";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-primary/90 py-3  text-white sticky top-0 z-50  backdrop-blur-md">
      <div className="flex justify-between items-center  custom-container">
        <LogoNav />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            {NavLinks.map((link) => {
              return (
                <NavigationMenuItem
                  key={link.name}
                  className="hover:-translate-y-0.25 transition-all duration-300 ease-in-out"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-all hover:text-text-primary duration-300 ease-in-out ${
                        isActive ? "text-text-primary" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className=" gap-2 flex ">
          <Button
            variant="outline"
            className="bg-transparent cursor-pointer hover:-translate-y-0.25  transition-all duration-300 ease-in-out"
            onClick={() => navigate("/Login")}
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            className="bg-secondary cursor-pointer hover:-translate-y-0.25  transition-all duration-300 ease-in-out"
            onClick={() => navigate("/Register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
