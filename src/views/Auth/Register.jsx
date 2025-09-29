// Components
import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";

// React
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Register() {
  const navigate = useNavigate();
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
    navigate("/Register2");
  };

  return (
    <section className="my-5">
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

        <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
      <div className="footer my-10 text-center text-sm text-text-secondary">
        <p>
          © 2025 <span className="font-bold">Learnify</span>. All Rights
          Reserved.
        </p>
      </div>
    </section>
  );
}

export default Register;
