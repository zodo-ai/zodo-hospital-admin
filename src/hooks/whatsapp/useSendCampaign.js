import { useMutation } from "@tanstack/react-query";
import { sendCampaign } from "../../apis/whatsappMarketing";
import { toast } from "react-toastify";

export const useSendCampaign = () => {
  return useMutation({
    mutationFn: sendCampaign,
    onSuccess: () => {
      toast.success("Campaign sent successfully");
    },
    onError: () => {
      toast.error("Failed to send campaign");
    },
  });
};