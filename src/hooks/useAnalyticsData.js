import { useQuery } from "@tanstack/react-query";
import { getAnalyticsData } from "../apis/dashboard";

export const useAnalyticsData = (hospital_id, query) => {
  return useQuery({
    queryKey: ["analytics", hospital_id, query], // Unique query key
    queryFn: () => hospital_id && getAnalyticsData(hospital_id, query)
  });
};
