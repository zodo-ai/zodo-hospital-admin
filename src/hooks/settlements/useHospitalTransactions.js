import { useQuery } from "@tanstack/react-query";
import {
  getHospitalTransactions
} from "../../apis/settlement";

export const useHospitalTransactions = (hospital_id, query) => {
  return useQuery({
    queryKey: ["transactions", hospital_id, query], // Unique query key
    queryFn: () => getHospitalTransactions(hospital_id, query),
    enabled: !!hospital_id
  });
};
