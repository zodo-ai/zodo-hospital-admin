import { useQuery } from "@tanstack/react-query";
import { getDistrict } from "../apis/district";

export const useGetDistrict = () => {  
    return useQuery({
      queryKey: ["districts"], // Unique query key
      queryFn: () => getDistrict(),
    });
  };