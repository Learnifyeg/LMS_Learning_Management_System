import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import StuDashboard from "@/views/Student/StuDashboard.jsx";
import StuStudentLayout from "@/views/Student/StudentLayout.jsx";
import StuCheckout from "@/views/Student/StuCheckout.jsx";
import StuCourseDetails from "@/views/Student/StuCourseDetails.jsx";
import StuProfile from "@/views/Student/StuProfile.jsx";
import StuInvoice from "@/views/Student/StuInvoice.jsx";
import StuMyCertificates from "@/views/Student/StuMyCertificates.jsx";
import StuQuizPage from "@/views/Student/StuQuizPage.jsx";
import StuQuizResult from "@/views/Student/StuQuizResult.jsx";
import StuSavedCourses from "@/views/Student/StuSavedCourses.jsx";
import StuShoppingCart from "@/views/Student/StuShoppingCart.jsx";
import UserLayout from "@/views/Others/UserLayout.jsx";
import ContactUs from "@/views/Others/ContactUs.jsx";
import HelpPage from "@/views/Others/HelpPage.jsx";
import Notifications from "@/views/Others/Notifications.jsx";
import SearchResults from "@/views/Others/SearchResults.jsx";
import SendFeedback from "@/views/Others/SendFeedback.jsx";
import SettingPage from "@/views/Others/SettingPage.jsx";
import TermsofUse from "@/views/Others/TermsofUse.jsx";

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
      {
        path: "UserLayout",
        element: <UserLayout />,
        children: [
          { path: "ContactUs", element: <ContactUs /> },
          { path: "HelpPage", element: <HelpPage /> },
          { path: "Notifications", element: <Notifications /> },
          { path: "SearchResults", element: <SearchResults /> },
          { path: "SendFeedback", element: <SendFeedback /> },
          { path: "SettingPage", element: <SettingPage /> },
          { path: "TermsofUse", element: <TermsofUse /> },
        ],
      },
      {
        path: "StudentLayout",
        element: <StuStudentLayout />,
        children: [
          { path: "StuCheckout", element: <StuCheckout /> },
          { path: "StuCourseDetails", element: <StuCourseDetails /> },
          { path: "StuProfile", element: <StuProfile /> },
          { path: "StuDashboard", element: <StuDashboard /> },
          { path: "StuInvoice", element: <StuInvoice /> },
          { path: "StuMyCertificates", element: <StuMyCertificates /> },
          { path: "StuQuizPage", element: <StuQuizPage /> },
          { path: "StuQuizResult", element: <StuQuizResult /> },
          { path: "StuSavedCourses", element: <StuSavedCourses /> },
          { path: "StuShoppingCart", element: <StuShoppingCart /> },
        ],
      },
    ],
  },
]);
