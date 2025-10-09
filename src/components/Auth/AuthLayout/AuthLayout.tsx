import { Outlet, useLocation } from "react-router";
import authIMG from "@/assets/authIMG.webp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LogoModes from "@/components/ui/LogoTheme/LogoModes";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/utils/ThemeProvider";
import { SocialButtons } from "@/assets/Constants/Features";
import SocialButton from "../SocialButton/SocialButton";
const AuthLayout = () => {
  const { theme } = useTheme();
  const title = useLocation().pathname.split("/").pop();

  return (
    <main className="min-h-dvh overflow-y-auto bg-surface ">
      <div className="flex min-h-dvh  mx-0 rounded-md px-0 border-border shadow-lg">
        <Card className=" w-full border-none flex-3 px-5">
          <CardHeader className="text-center">
            <div className="mx-auto">
              <LogoModes />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">
              Welcome to Learnify
            </CardTitle>
            {title !== "ForgetPassword" ? (
              <p className="text-muted-foreground mt-2">
                {title === "Login" ? "Log In" : "Sign Up"} to Your Learnify
                Account!
              </p>
            ) : (
              ""
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Social Buttons */}

            {title !== "ForgetPassword" &&
              SocialButtons.map((item, i) => (
                <SocialButton
                  key={i}
                  Icon={item.Icon}
                  title={item.title}
                  color={item.color}
                />
              ))}
            <Separator />
            <main className="mt-4">
              <Outlet />
            </main>
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
