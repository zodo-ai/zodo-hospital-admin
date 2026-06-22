import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../apis/hospitalWeb";

export const useBanners = (hospitalId) => {
  return useQuery({
    queryKey: ["banners", hospitalId],
    queryFn: () => getBanners(hospitalId),
    enabled: !!hospitalId,
  });
};
