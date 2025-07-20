import { useQueries } from "@tanstack/react-query";
import { getWeekAvailability } from "../../apis/timeslots";

export const useGetWeekAvailabilities = (doctor_id, week_ids) => {
  
  const queries = useQueries({
    queries: week_ids?.map((id) => ({
      queryKey: ["availabilities", doctor_id, id], // ✅ Array format
      queryFn: () => getWeekAvailability(doctor_id, id),
      enabled: !!doctor_id && !!id, // Ensure doctor_id and id are defined
    })),
  });
  
  return {
    data: queries.map((query) => query.data || []), // Return data from all queries
    isLoading: queries.some((query) => query.isLoading), // Check if any query is loading
    isError: queries.some((query) => query.isError), // Check if any query has an error
    error: queries.find((query) => query.isError)?.error, // Return the first error encountered
  };
};
