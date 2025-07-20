import { useQuery } from "@tanstack/react-query";
import {
  getDoctorAppointments,
  getDoctorAppointmentsByQuery,
} from "../../apis/appointments";

export const useDoctorAppointments = (id, query) => {
  return useQuery({
    queryKey: ["doctorAppointments", id, query], // Unique query key
    queryFn: () =>
      query
        ? getDoctorAppointmentsByQuery(id, query)
        : getDoctorAppointments(id),
  });
};
