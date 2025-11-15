import api from "@/API/Config";
import Urls from "@/API/URL";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/store/useAuth";
import useTokenStore from "@/store/user";

const useDashboard = () => {
  const { user: User } = useTokenStore.getState();
  const UserRole = User?.role ?? "admin"?.toLowerCase();
  // console.log("object", UserRole);

  const dashboard = useQuery({
    queryKey: ["dashboard", UserRole],
    queryFn: async () => {
      if (!UserRole) throw new Error("Role not found");

      let url = "";
      switch (UserRole) {
        case "student":
          url = Urls.dashboardStudent; // "/Dashboard/student"
          break;
        case "instructor":
          url = Urls.dashboardInstructor; // "/Dashboard/instructor"
          break;
        case "admin":
          url = Urls.dashboardAdmin; // "/Dashboard/admin"
          break;
        default:
          throw new Error("Invalid role");
      }

      const res = await api.get(url);
      return res.data;
    },
    enabled: !!UserRole, 
  });

  return { dashboard, UserRole };
};

export default useDashboard;
