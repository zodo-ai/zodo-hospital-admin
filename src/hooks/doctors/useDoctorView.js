import { useQuery } from "@tanstack/react-query";
import { getDoctorsListByDoctorId } from "../../apis/doctor";

export const useDoctorView = (doctor_id) => {
  return useQuery({
    queryKey: ["doctor", doctor_id], // Unique query key
    queryFn: () => getDoctorsListByDoctorId(doctor_id),
  });
};
