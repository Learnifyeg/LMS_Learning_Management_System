// Components
// import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";

// React
import { Link, useNavigate } from "react-router";
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
import { Button } from "@/components/ui/button";

const RegisterSchema = z.object({
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  policiesCheck: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  // const { setUser } = useUserStore();
  const onSubmit = (data) => {
    console.log("Submitted");
    // const response = axios.post("http://localhost:8000/api/register", data);
    // if (response.status !== 200) return; //status 200 , message: "success", user : { email: "string", fullName: "string", phoneNumber: "string", role: "string" , token: "string" }
    // setUser(data);
    console.log(data);
    // navigate("/User/Login");
  };

  return (
    <section className="my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-left">
          <label className="block text-sm mb-1">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <Input
                {...register("fullName")}
                type="text"
                placeholder="Enter full name..."
                className="px-10 py-2 "
              />
            </div>
          </label>
        </div>

        <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
        <div className="mb-4">
          <label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <Input
                {...register("email")}
                type="text"
                placeholder="Enter email..."
                className="px-10 py-2"
              />{" "}
            </div>
          </label>
        </div>
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        <label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter password..."
              className="px-10 py-2"
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
        {/* forget password? */}
        <p className="text-text-secondary text-sm">
          <input
            {...register("policiesCheck")}
            type="checkbox"
            className="mr-2 translate-y-0.5 accent-primary"
          />
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
          {errors.policiesCheck && (
            <span className="text-red-500 text-sm mt-1 inline-block">
              {errors.policiesCheck.message}
            </span>
          )}
        </p>
      </form>
      <hr className="my-5 text-text-secondary" />
      <p className="text-text-secondary">
        Already have an account?{" "}
        <span
          className="text-secondary cursor-pointer hover:scale-105 font-bold"
          onClick={() => navigate("/User/Login")}
        >
          Sign In
        </span>
      </p>
      <Link to="/User/InstructorRegister" className="flex-1 flex items-end">
        <Button className="mt-5 w-full cursor-pointer">
          Instructor Register
        </Button>
      </Link>
    </section>
  );
}

export default Register;
