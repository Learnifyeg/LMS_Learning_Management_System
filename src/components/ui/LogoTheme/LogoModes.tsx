// Assets
import { useTheme } from "@/utils/ThemeProvider";
import LogoWhite from "../../../public/learnify_white.svg";
import LogoBlack from "../../../public/learnify_black.svg";

const LogoModes = () => {
  const { theme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <img src={LogoWhite} alt="Logo" className="w-32 mb-6" />
      ) : (
        <img src={LogoBlack} alt="Logo" className="w-40 mb-6" />
      )}
    </>
  );
};

export default LogoModes;
