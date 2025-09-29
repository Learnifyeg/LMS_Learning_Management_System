// Assets
// import LogoBlack from "../../../public/learnify_black.svg";
// import LogoWhite from "../../../public/learnify_white.svg";

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
import LogoModes from "@/components/ui/LogoTheme/LogoModes";

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
    <section className="my-5">
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
          onClick={() => navigate("/User/Login")}
        >
          Sign In
        </span>
      </p>
    </section>
  );
}

export default ForgetPassword;
