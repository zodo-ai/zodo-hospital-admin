import { useQuery } from "@tanstack/react-query";
import { getHospitalById } from "../../apis/hospital";

export const useViewHospital = (hospital_id) => {
  return useQuery({
    queryKey: ["hospital", hospital_id], // Unique query key
    queryFn: () => getHospitalById(hospital_id),
    enabled: !!hospital_id
  });
};
