import { useQuery } from "@tanstack/react-query";
import { getDoctorsRevenue } from "../../apis/doctorsrevenue";

export const useDoctorsRevenue = (query) => {
  return useQuery({
    queryKey: ["doctorsRevenue", query],
    queryFn: () => getDoctorsRevenue(query),
    enabled: !!query,
  });
};