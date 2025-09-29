import { Outlet, useLocation } from "react-router";
import authIMG from "@/assets/authIMG.webp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import LogoModes from "@/components/ui/LogoTheme/LogoModes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/utils/ThemeProvider";
const AuthLayout = () => {
  const { theme } = useTheme();
  const title = useLocation().pathname.split("/").pop();
  console.log(title);
  return (
    <main className="h-screen bg-surface">
      <div className="flex h-full  mx-0 rounded-md overflow-hidden px-0 border-border shadow-lg">
        <Card className=" w-full border-none flex-3 px-5">
          <CardHeader className="text-center">
            <div className="mx-auto">
              <LogoModes />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">
              Welcome to Learnify
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              {title === "Login" ? "Log In" : "Sign Up"} to Your Learnify
              Account!
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Social Buttons */}
            <Button className="w-full flex items-center justify-start pl-30 gap-5 bg-[#3b5998] text-white py-2 rounded-lg hover:scale-105 hover:-traslnnate-y-0.5  transition-all duration-300 ease-in-out">
              <FaFacebook className="w-5 h-5" />
              <span>Continue with Facebook</span>
            </Button>
            <Button className="w-full flex items-center justify-start pl-30 gap-5 bg-[#1da1f2] text-white py-2 rounded-lg hover:scale-105 hover:-traslnnate-y-0.5  transition-all duration-300 ease-in-out">
              <FaTwitter className="w-5 h-5" />
              <span>Continue with Twitter</span>
            </Button>
            <Button className="w-full flex items-center justify-start pl-30 gap-2 bg-[#34a853] text-white py-2 rounded-lg hover:scale-105 hover:-traslnnate-y-0.5  transition-all duration-300 ease-in-out">
              <FaGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </Button>
            <Separator />
            <Outlet />
          </CardContent>
        </Card>
        <div className="flex-5 rounded-md hidden md:block relative">
          {theme === "dark" && (
            <div className="w-full h-full bg-black/40 opacity-45 absolute  " />
          )}
          <img
            src={authIMG}
            alt="auth"
            loading="lazy"
            className="w-full h-full object-left object-cover "
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
