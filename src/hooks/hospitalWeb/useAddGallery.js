import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addGallery } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useAddGallery = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: addGallery,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["gallery", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Gallery image added successfully";
      queryClient.invalidateQueries({ queryKey: ["gallery", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to add gallery image";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
