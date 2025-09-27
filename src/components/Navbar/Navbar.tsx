import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "../../assets/Logo/logo.svg";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { NavLinks } from "@/assets/Constants/NavLinks";
const Navbar = () => {
  return (
    <header className="bg-primary/90 py-3  text-white sticky top-0 z-50 ">
      <div className="flex justify-between items-center  custom-container">
        <Button variant="link" className="cursor-pointer">
          <Avatar className="transform scale-200  hover:scale-250 hover:ml-7 transition-all duration-300 ease-in-out">
            <AvatarImage src={Logo} />
            <AvatarFallback>Learnify Logo</AvatarFallback>
          </Avatar>
        </Button>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            {NavLinks.map((link) => (
              <NavigationMenuItem
                key={link.name}
                className="hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <NavigationMenuLink asChild>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-all hover:text-text-primary duration-300 ease-in-out ${
                        isActive ? "text-secondary font-semibold" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className=" gap-2 flex ">
          <Button
            variant="outline"
            className="bg-transparent cursor-pointer hover:-translate-y-0.25  transition-all duration-300 ease-in-out"
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            className="bg-secondary cursor-pointer hover:-translate-y-0.25  transition-all duration-300 ease-in-out"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
