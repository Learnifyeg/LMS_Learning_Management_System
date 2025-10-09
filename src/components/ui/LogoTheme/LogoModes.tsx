// Assets
import { useTheme } from "@/utils/ThemeProvider";
import LogoWhite from "../../../assets/Logo/learnify_white.svg";
import LogoBlack from "../../../assets/Logo/learnify_black.svg";
import { Link } from "react-router";

const LogoModes = ({
  widthWhite = "w-28",
  widthBlack = "w-32",
}: {
  widthWhite?: string;
  widthBlack?: string;
}) => {
  const { theme } = useTheme();
  return (
    <>
      <Link to="/">
        {theme === "dark" ? (
          <img src={LogoWhite} alt="Logo" className={`${widthWhite} mb-6`} />
        ) : (
          <img src={LogoBlack} alt="Logo" className={`${widthBlack} mb-6`} />
        )}
      </Link>
    </>
  );
};

export default LogoModes;
