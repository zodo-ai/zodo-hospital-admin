import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateGallery } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useEditGallery = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: updateGallery,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["gallery", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Gallery image updated successfully";
      queryClient.invalidateQueries({ queryKey: ["gallery", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update gallery image";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
