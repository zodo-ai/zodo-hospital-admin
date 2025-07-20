import { useQuery } from "@tanstack/react-query";
import { getHospitalAnalytics } from "../../apis/dashboard";

export const useHospitalAnalytics = (id) => {
  if (!id || typeof id !== "string" || id.trim() === "" || id === undefined) {
    return { data: null, isLoading: false, isError: true };
  }
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["hospital-analytics", id], // Unique query key
    queryFn: () => getHospitalAnalytics(id),
  });
};
