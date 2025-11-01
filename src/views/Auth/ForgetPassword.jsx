import { useTheme } from "@/utils/ThemeProvider";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import api from "@/API/Config";

const ForgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function ForgetPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting email for password reset:", data.email);
      const response = await api.post("/Auth/forgot-password", {
        email: data.email,
      });

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/User/ResetPassword", { state: { email: data.email } });
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            {...register("email")}
            type="text"
            placeholder="Enter your email..."
            className="bg-input px-10 py-2"
          />
        </div>
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

        <button
          className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
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
