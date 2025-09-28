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
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Register() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const { setUser } = useUserStore();
  const onSubmit = (data) => {
    console.log("Submitted");
    // const response = axios.post("http://localhost:8000/api/register", data);
    // if (response.status !== 200) return; //status 200 , message: "success", user : { email: "string", fullName: "string", phoneNumber: "string", role: "string" , token: "string" }
    setUser(data);
   navigate("/Register2")
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
          <p className="text-3xl font-bold mb-5 text-primary">
            Welcome to Learnify
          </p>
          <p className="mb-5 text-text-secondary">
            Sign Up and Start Learning!
          </p>
          <button className="btn bg-[#3b5998] w-full mb-3 cursor-pointer hover:scale-102 flex items-center justify-center gap-2">
            <FaFacebook size={20} />
            Continue with Facebook
          </button>
          <button className="btn bg-[#1da1f2] w-full mb-3 cursor-pointer hover:scale-102 flex items-center justify-center gap-2">
            <FaTwitter size={20} /> Continue with Twitter
          </button>
          <button className="btn bg-[#34a853] w-full mb-3 cursor-pointer hover:scale-102 flex items-center justify-center gap-2">
            <FaGoogle size={20} />
            Continue with Google
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    {...register("fullName")}
                    type="text"
                    placeholder="Enter full name..."
                    className="bg-input px-10 py-2 "
                  />
                </div>
              </label>
            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.fullName?.message}
            </p>
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
            <label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter password..."
                  className="bg-input px-10 py-2"
                />{" "}
              </div>
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button
              className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
              type="submit"
             
            >
              Next
            </button>
          </form>
          {/* forget password? */}
          <p className="text-text-secondary">
            By signing up, you agree to our{" "}
            <span
              className="text-secondary cursor-pointer hover:scale-105 font-bold"
              onClick={() => navigate("/TermsofUse")}
            >
              Terms of Use
            </span>{" "}
            and{" "}
            <span
              className="text-secondary cursor-pointer hover:scale-105 font-bold"
              onClick={() => navigate("/PrivacyPolicy")}
            >
              Privacy Policy.
            </span>
          </p>
          <hr className="my-5 text-text-secondary" />
          <p className="text-text-secondary">
            Already have an account?{" "}
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

export default Register;
