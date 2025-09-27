import { useForm } from "react-hook-form";
import LogoBlack from "../../../public/learnify_black.svg";
import LogoWhite from "../../../public/learnify_white.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useUserStore from "@/store/user";
import { useNavigate } from "react-router";

const RegisterSchema = z.object({
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
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
    navigate("/");
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center p-10">
        <img
          src={
            document.documentElement.classList.contains("dark")
              ? LogoWhite
              : LogoBlack
          }
          alt=""
          className="w-1/8"
        />
        <div className="form bg-background p-10 rounded-lg shadow-lg mt-5 w-full text-center max-w-md">
          <p className="text-3xl font-bold mb-5 text-primary">
            Welcome to Learnify
          </p>
          <p className="mb-5 text-text-secondary">
            Register to Your Learnify Account!
          </p>
          <button className="btn bg-[#3b5998] w-full mb-3 cursor-pointer hover:scale-102">
            Continue with Facebook
          </button>
          <button className="btn bg-[#1da1f2] w-full mb-3 cursor-pointer hover:scale-102">
            Continue with Twitter
          </button>
          <button className="btn bg-[#34a853] w-full mb-3 cursor-pointer hover:scale-102">
            Continue with Google
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Full Name
              <input
                {...register("fullName")}
                className="border border-black"
              />
            </label>
            <p>{errors.fullName?.message}</p>
            <label>
              Email
              <input {...register("email")} className="border border-black" />
            </label>
            <p>{errors.email?.message}</p>

            <button type="submit">Submit</button>
          </form>
          {/* forget password? */}
          <p className="text-text-secondary">
            Or{" "}
            <span className="text-secondary cursor-pointer hover:scale-105">
              Forgot Password.
            </span>
          </p>
          <hr className="my-5 text-text-secondary" />
          <p className="text-text-secondary">
            Don't have an account?{" "}
            <span className="text-secondary cursor-pointer hover:scale-105">
              Sign Up
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
