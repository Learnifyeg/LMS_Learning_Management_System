import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ForgetPassword from "./views/Auth/ForgetPassword";
import Register2 from "./views/Auth/Register2";
const Landing = lazy(() => import("./views/Landing.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/Login", element: <Login /> },
      { path: "/Register", element: <Register /> },
      { path: "/Register2", element: <Register2 /> },
      { path: "/ForgetPassword", element: <ForgetPassword/> },
      {
        path: "*",
        Component: () => <Navigate to="/NotFound" />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
