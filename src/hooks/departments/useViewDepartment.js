import { useQuery } from "@tanstack/react-query";
import { viewDepartment } from "../../apis/departments";

export const useViewDepartment = (department_id) => {
  return useQuery({
    queryKey: ["department", department_id], // Unique query key
    queryFn: () => viewDepartment(department_id),
  });
};