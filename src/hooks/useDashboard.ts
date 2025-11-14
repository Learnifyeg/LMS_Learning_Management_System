import api from "@/API/Config";
import Urls from "@/API/URL";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const dashboard = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get(Urls.dashboard);
      return res.data;
    },
  });

  return { dashboard };
};

export default useDashboard;
