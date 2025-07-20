import { useQuery } from "@tanstack/react-query";
import { getSpecializations } from "../../apis/specialisation";

export const useSpecialisationList = (hospital_id) => {
  return useQuery({
    queryKey: ["specialisations", hospital_id], // Unique query key
    queryFn: () =>getSpecializations(hospital_id),
  });
};