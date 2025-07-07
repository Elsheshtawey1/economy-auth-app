import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDashboardStats = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("/economy-api/v1/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.newAdminStatistics;
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
