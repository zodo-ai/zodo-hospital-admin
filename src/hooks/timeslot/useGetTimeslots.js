import { useQuery } from "@tanstack/react-query";
import { getTimeslot } from "../../apis/timeslots";

export const useGetTimeslots = (doctor_id, hospital_id, date) => {
  return useQuery({
    queryKey: ["timeslots",doctor_id, hospital_id, date], // Unique query key
    queryFn: () => getTimeslot(doctor_id, hospital_id, date), // Only run if doctor_id is available
    enabled: !!doctor_id && !!hospital_id && !!date, // Ensure the query runs only when doctor_id, hospital_id, and date are available
    refetchOnWindowFocus: false, // Optional: Prevent refetching on window focus
  });
};
