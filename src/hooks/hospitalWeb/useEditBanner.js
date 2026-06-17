import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateBanner } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useEditBanner = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: updateBanner,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["banners", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Banner updated successfully";
      queryClient.invalidateQueries({ queryKey: ["banners", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update banner";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
