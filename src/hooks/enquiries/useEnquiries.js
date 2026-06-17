import { useQuery } from "@tanstack/react-query";
import { getEnquiries } from "../../apis/enquiries";

export const useEnquiries = (hospital_id, query) => {
  return useQuery({
    queryKey: ["enquiries", hospital_id, query], // Unique query key
    queryFn: () => getEnquiries(hospital_id, query),
    enabled: !!hospital_id,
  });
};
