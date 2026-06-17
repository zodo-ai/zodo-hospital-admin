import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addBanner } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useAddBanner = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: addBanner,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["banners", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Banner added successfully";
      queryClient.invalidateQueries({ queryKey: ["banners", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to add banner";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
