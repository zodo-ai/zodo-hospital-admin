import { useQuery } from "@tanstack/react-query";
import { getHospitalAppointmentsByStatus } from "../../apis/appointments";

export const useAppointmentByStatus = (id, status) => {
  return useQuery({
    queryKey: ["appointments", id, status], // Unique query key
    queryFn: () => getHospitalAppointmentsByStatus(id, status),
  });
};