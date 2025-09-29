// React
import LogoModes from "@/components/ui/LogoTheme/LogoModes";
import { useNavigate } from "react-router";

function Error404() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-background px-6">
      <LogoModes />

      <h1 className="text-[230px] font-bold text-secondary mb-4 max-md:text-[150px] ">
        404
      </h1>
      <p className="text-lg text-primary mb-8">
        The page you were looking for could not be found.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-secondary text-text-primary rounded-md hover:scale-105 transition cursor-pointer"
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
