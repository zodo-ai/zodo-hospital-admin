import { useQuery } from "@tanstack/react-query";
import {
  getSettlementsByHospitalId
} from "../../apis/settlement";

export const useHospitalSettlements = (hospital_id, query) => {
  return useQuery({
    queryKey: ["settlements", hospital_id, query], // Unique query key
    queryFn: () => getSettlementsByHospitalId(hospital_id, query),
    enabled: !!hospital_id
  });
};