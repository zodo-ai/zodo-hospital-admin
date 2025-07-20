import { useQuery } from "@tanstack/react-query";
import { fetchWallet } from "../../apis/settlement";

export const useFetchWallet = (hospital_id) => {  
  return useQuery({
    queryKey: ["wallets", hospital_id], // Unique query key
    queryFn: ()=>fetchWallet(hospital_id),
    enabled: !!hospital_id, // Ensure the query runs only when hospital_id is available
  });
};
