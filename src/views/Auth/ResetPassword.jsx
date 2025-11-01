import { useTheme } from "@/utils/ThemeProvider";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate, useLocation } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

// Zod schema for reset password
const ResetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z.string().min(6, "Enter the 6-digit code"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // If user navigated from ForgetPassword, get email from state
  const defaultEmail = (location.state)?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: defaultEmail },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/Auth/reset-password", {
        email: data.email,
        code: data.code,
        newPassword: data.newPassword,
      });

      if (response.status === 200) {
        alert(response.data.message); // e.g., "Password updated successfully"
        navigate("/User/Login");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            {...register("email")}
            type="text"
            placeholder="Enter your email..."
            className="bg-input px-10 py-2"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Reset Code */}
        <div className="mb-4 relative">
          <Input
            {...register("code")}
            type="text"
            placeholder="Enter reset code"
            className="bg-input px-3 py-2"
          />
          <p className="text-red-500 text-sm mt-1">{errors.code?.message}</p>
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            {...register("newPassword")}
            type="password"
            placeholder="Enter new password"
            className="bg-input px-10 py-2"
          />
          <p className="text-red-500 text-sm mt-1">{errors.newPassword?.message}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {/* Go Back */}
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

export default ResetPassword;
