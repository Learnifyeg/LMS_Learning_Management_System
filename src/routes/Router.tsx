import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import StuDashboard from "@/views/Student/StuDashboard.jsx";

// Lazy imports
const LandingLayout = lazy(
  () => import("@/components/Landing/LandingLayout/LandingLayout.js")
);

// Landing Views
const Landing = lazy(() => import("../views/Landing/Landing.jsx"));
const Courses = lazy(() => import("../views/Landing/Courses.jsx"));
const About = lazy(() => import("../views/Landing/About.jsx"));
// Auth Views
const Login = lazy(() => import("../views/Auth/Login.jsx"));
const Register = lazy(() => import("../views/Auth/Register.jsx"));
const ForgetPassword = lazy(() => import("../views/Auth/ForgetPassword.jsx"));
const Register2 = lazy(() => import("../views/Auth/Register2.jsx"));

// Error Views
const Error404 = lazy(() => import("../views/Error404.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          { index: true, element: <Landing /> },
          { path: "Courses", element: <Courses /> },
          { path: "About", element: <About /> },
        ],
      },
      { path: "Courses", element: <Courses /> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "Register2", element: <Register2 /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "*", element: <Error404 /> },
      { path: "StuDashboard", element: <StuDashboard /> },
    ],
  },
]);
