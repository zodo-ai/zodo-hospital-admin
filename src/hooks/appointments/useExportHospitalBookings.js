import { useQuery } from "@tanstack/react-query";
import { exportHospitalBookings } from "../../apis/appointments";

export const useExportHospitalBookings = (hospital_id) => {
  return useQuery({
    queryKey: ["hospital-appointments"], // Unique query key
    queryFn: () => exportHospitalBookings(hospital_id),
    // enabled: false,
  });
};
