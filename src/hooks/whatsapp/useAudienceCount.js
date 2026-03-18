import { useMutation } from "@tanstack/react-query";
import { getAudienceCount } from "../../apis/whatsappMarketing";

export const useAudienceCount = () => {
  return useMutation({
    mutationFn: getAudienceCount,
  });
};