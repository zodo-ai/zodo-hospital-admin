import { useQuery } from "@tanstack/react-query";
import { getGallery } from "../../apis/hospitalWeb";

export const useGallery = (hospitalId) => {
  return useQuery({
    queryKey: ["gallery", hospitalId],
    queryFn: () => getGallery(hospitalId),
    enabled: !!hospitalId,
  });
};
