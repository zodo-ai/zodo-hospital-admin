import { useQuery } from "@tanstack/react-query";
import { getStaffByUserid } from "../../apis/users";

export const useViewStaff = (staff_id) => {
  return useQuery({
    queryKey: ["staff",staff_id], // Unique query key
    queryFn: () => getStaffByUserid(staff_id),
  });
};