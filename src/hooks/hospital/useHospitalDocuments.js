import { useQuery } from "@tanstack/react-query";
import { getHospitalDocuments } from "../../apis/hospital";

export const useHospitalDocuments = (id) => {
  return useQuery({
    queryKey: ["documents", id], // Unique query key
    queryFn: () => getHospitalDocuments(id),
    enabled: !!id
  });
};
