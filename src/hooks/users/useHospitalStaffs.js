import { useQuery } from "@tanstack/react-query";
import { getHospitalStaffs, getHospitalStaffsByQuery } from "../../apis/users";

export const useHospitalStaffs = (hospital_id, query) => {
  return useQuery({
    queryKey: ["staffs", hospital_id, query], // Unique query key
    queryFn: () =>
      query
        ? getHospitalStaffsByQuery(hospital_id, query)
        : getHospitalStaffs(hospital_id),
  });
};
