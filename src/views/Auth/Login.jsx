/* eslint-disable no-unused-vars */
// Components
import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";

// React
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { set } from "zod";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import LogoModes from "@/components/ui/LogoTheme/LogoModes";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import useTokenStore from "@/store/user";
import api from "@/API/Config";
import User from "@/store/Classes/User";
import useAuth from "@/hooks/useAuth";
import { useAppStore } from "@/store/app";

const RegisterSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginEndpoint = "Auth/login";
function Login() {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();
  const { setToast } = useAppStore();
  const { loginMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const onSubmit = async (data) => {
    await loginMutation.mutateAsync(data, {
      onSuccess(data) {
        setToken(data.token);
        setToast("Login Success", "success");
        navigate("/");
      },
      onError(err) {
        setToast("Login failed", "error");
      },
    });
  };

  // localStorage.clear();
  // sessionStorage.clear();
  return (
    <section className="my-5 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <Input
                {...register("email")}
                type="text"
                placeholder="Enter email..."
                className=" px-10"
              />
            </div>
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-5">
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
          type="submit"
        >
          Submit
        </button>
      </form>
      {/* forget password? */}
      <p className="text-text-secondary">
        Or{" "}
        <span
          className="text-secondary cursor-pointer hover:scale-105 font-bold"
          onClick={() => navigate("/User/ForgetPassword")}
        >
          Forgot Password.
        </span>
      </p>
      <hr className="my-5 text-text-secondary" />
      <p className="text-text-secondary">
        Don't have an account?{" "}
        <button
          className="text-secondary cursor-pointer hover:scale-105 font-bold"
          onClick={() => navigate("/User/Register")}
          disabled={loginMutation.isPending}
        >
          Sign Up
        </button>
      </p>
    </section>
  );
}

export default Login;
