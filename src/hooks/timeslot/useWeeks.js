import { useQuery } from "@tanstack/react-query";
import { getWeeks } from "../../apis/timeslots";

export const useWeeks = () => {
  
  return useQuery({
    queryKey: ["weeks"], // Unique query key
    queryFn: () => getWeeks(),
  });
};
