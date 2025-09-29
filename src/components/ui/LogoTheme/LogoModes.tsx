// Assets
import { useTheme } from "@/utils/ThemeProvider";
import LogoWhite from "../../../assets/Logo/learnify_white.svg";
import LogoBlack from "../../../assets/Logo/learnify_black.svg";
import { Link } from "react-router";

const LogoModes = () => {
  const { theme } = useTheme();
  return (
    <>
      <Link to="/">
        {theme === "dark" ? (
          <img src={LogoWhite} alt="Logo" className="w-32 mb-6" />
        ) : (
          <img src={LogoBlack} alt="Logo" className="w-40 mb-6" />
        )}
      </Link>
    </>
  );
};

export default LogoModes;
