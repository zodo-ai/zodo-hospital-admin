import { useQuery } from "@tanstack/react-query";
import { getHospitalAppointments, getHospitalAppointmentsByQuery } from "../../apis/appointments";

export const useHospitalAppointments = (id, query) => {
  return useQuery({
    queryKey: ["appointments", id, query], // Unique query key
    queryFn: () => query ? getHospitalAppointmentsByQuery(id, query) : getHospitalAppointments(id),
  });
};