// React
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import FullSpinner from "./components/ui/Full Spinner/FullSpinner";
import { router } from "./routes/Router";
const Landing = lazy(() => import("./views/Landing/Landing.jsx"));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<FullSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
