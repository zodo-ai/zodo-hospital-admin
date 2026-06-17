import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../apis/hospitalWeb";

export const useSettings = (hospitalId) => {
  return useQuery({
    queryKey: ["settings", hospitalId],
    queryFn: () => getSettings(hospitalId),
    enabled: !!hospitalId,
  });
};
