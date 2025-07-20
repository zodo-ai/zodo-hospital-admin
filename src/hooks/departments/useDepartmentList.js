import { useQuery } from "@tanstack/react-query";
import {
  getDepartmentList,
  getDepartmentListByQuery,
} from "../../apis/departments";

export const useDepartmentList = (id, query) => {
  return useQuery({
    queryKey: ["departments", id, query], // Unique query key
    queryFn: () =>
      query ? getDepartmentListByQuery(id, query) : getDepartmentList(id),
  });
};
