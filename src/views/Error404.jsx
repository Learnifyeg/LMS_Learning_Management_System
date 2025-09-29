// Assets
import LogoWhite from "../../public/learnify_white.svg";

// Components
import { useTheme } from "@/utils/ThemeProvider";

// React
import { useNavigate } from "react-router";

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-[#111827] px-6">
      <img src={LogoWhite} alt="Logo" className="w-32 mb-6" />

      <h1 className="text-[230px] font-bold text-secondary mb-4 max-md:text-[150px] ">
        404
      </h1>
      <p className="text-lg text-white mb-8">
        The page you were looking for could not be found.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-secondary text-white rounded-md hover:scale-105 transition cursor-pointer"
      >
        Go to Home Page
      </button>
      <p className="text-md text-gray-400 mt-10">
        © 2025 <span className="text-secondary font-bold">Learnify</span>. All
        Rights Reserved
      </p>
    </div>
  );
}

export default Error404;
