// Assets
import LogoBlack from "../../../public/learnify_black.svg";
import LogoWhite from "../../../public/learnify_white.svg";

// Components
import { useTheme } from "@/utils/ThemeProvider";
import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";

// React
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";


const RegisterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

function ForgetPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const onSubmit = (data) => {
    console.log("Submitted");
  };
  return (
    <section>
      <div className="flex flex-col justify-center items-center p-10">
        {theme === "dark" ? (
          <img src={LogoWhite} alt="" className="w-1/8" />
        ) : (
          <img src={LogoBlack} alt="" className="w-1/8" />
        )}

        <div className="form bg-card p-10 rounded-lg shadow-lg mt-5 w-full text-center max-w-md">
          <p className="text-2xl font-bold mb-10 text-primary">
            Request a Password Reset
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    {...register("email")}
                    type="text"
                    placeholder="Enter email..."
                    className="bg-input px-10 py-2"
                  />{" "}
                </div>
              </label>
            </div>
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

            <button
              className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          <p className="text-text-secondary">
            Go Back{" "}
            <span
              className="text-secondary cursor-pointer hover:scale-105 font-bold"
              onClick={() => navigate("/Login")}
            >
              Sign In
            </span>
          </p>
        </div>
        <div className="footer my-10 text-center text-sm text-text-secondary">
          <p>
            © 2025 <span className="font-bold">Learnify</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
