import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App.jsx";

// Student Views
const StuDashboard = lazy(() => import("@/views/Student/StuDashboard.jsx"));
const StuStudentLayout = lazy(
  () => import("@/views/Student/StudentLayout.jsx")
);
const StuCheckout = lazy(() => import("@/views/Student/StuCheckout.jsx"));
const StuCourseDetails = lazy(
  () => import("@/views/Student/StuCourseDetails.jsx")
);
const StuProfile = lazy(() => import("@/views/Student/StuProfile.jsx"));
const StuInvoice = lazy(() => import("@/views/Student/StuInvoice.jsx"));
const StuMyCertificates = lazy(
  () => import("@/views/Student/StuMyCertificates.jsx")
);
const StuQuizPage = lazy(() => import("@/views/Student/StuQuizPage.jsx"));
const StuQuizResult = lazy(() => import("@/views/Student/StuQuizResult.jsx"));
const StuSavedCourses = lazy(
  () => import("@/views/Student/StuSavedCourses.jsx")
);
const StuShoppingCart = lazy(
  () => import("@/views/Student/StuShoppingCart.jsx")
);

// Others
const UserLayout = lazy(() => import("@/views/Others/UserLayout.jsx"));
const ContactUs = lazy(() => import("@/views/Others/ContactUs.jsx"));
const HelpPage = lazy(() => import("@/views/Others/HelpPage.jsx"));
const Notifications = lazy(() => import("@/views/Others/Notifications.jsx"));
const SearchResults = lazy(() => import("@/views/Others/SearchResults.jsx"));
const SendFeedback = lazy(() => import("@/views/Others/SendFeedback.jsx"));
const SettingPage = lazy(() => import("@/views/Others/SettingPage.jsx"));
const TermsofUse = lazy(() => import("@/views/Others/TermsofUse.jsx"));

// Landing Views
const LandingLayout = lazy(
  () => import("@/components/Landing/LandingLayout/LandingLayout.js")
);
const Landing = lazy(() => import("../views/Landing/Landing.jsx"));
const Courses = lazy(() => import("../views/Landing/Courses.jsx"));
const About = lazy(() => import("../views/Landing/About.jsx"));
// Auth Views
const AuthLayout = lazy(
  () => import("@/components/Auth/AuthLayout/AuthLayout.js")
);
const Login = lazy(() => import("../views/Auth/Login.jsx"));
const Register = lazy(() => import("../views/Auth/Register.jsx"));
const ForgetPassword = lazy(() => import("../views/Auth/ForgetPassword.jsx"));
const Register2 = lazy(() => import("../views/Auth/InstructorRegister.jsx"));

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
      {
        path: "User",
        element: <AuthLayout />,
        children: [
          { path: "Login", element: <Login /> },
          { path: "Register", element: <Register /> },
          { path: "Register2", element: <Register2 /> },
          { path: "ForgetPassword", element: <ForgetPassword /> },
        ],
      },
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
