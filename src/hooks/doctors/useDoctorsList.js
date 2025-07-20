import { useQuery } from "@tanstack/react-query";
import {
  getDoctorsListById,
  getHospitalDoctorsListByQuery,
} from "../../apis/doctor";

export const useDoctorsList = (hospital_id, query) => {
  return useQuery({
    queryKey: ["doctors", hospital_id, query], // Unique query key
    queryFn: () =>
      query
        ? getHospitalDoctorsListByQuery(hospital_id, query)
        : getDoctorsListById(hospital_id)
  });
};
