import { useQuery } from "@tanstack/react-query";
import {
  getHospitalServicesList,
  getHospitalServicesListByQuery,
} from "../../apis/hospitalServices";

export const useHospitalServices = (id, query) => {
  return useQuery({
    queryKey: ["services", id, query], // Unique query key
    queryFn: () =>
      query
        ? getHospitalServicesListByQuery(id, query)
        : getHospitalServicesList(id)
  });
};
