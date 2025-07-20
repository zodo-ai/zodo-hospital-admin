import { useQuery } from "@tanstack/react-query";
import { getServicesById } from "../../apis/hospitalServices";

export const useViewService = (service_id) => {
  return useQuery({
    queryKey: ["service",service_id], // Unique query key
    queryFn: () => service_id && getServicesById(service_id),
    enabled: !!service_id
  });
};