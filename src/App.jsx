import { Outlet } from "react-router";
import { ThemeProvider } from "./utils/ThemeProvider";
import ThemeToggle from "./components/ui/ThemeToggle/ThemeToggle";

const App = () => {
  return (
    <ThemeProvider>
      <div className="relative ">
        <ThemeToggle />
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default App;
