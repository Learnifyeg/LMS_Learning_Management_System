import { Outlet } from "react-router";
import { ThemeProvider } from "./utils/ThemeProvider";
import ThemeToggle from "./components/ui/ThemeToggle/ThemeToggle";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="relative min-h-screen ">
          <ThemeToggle />
          <Outlet />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
