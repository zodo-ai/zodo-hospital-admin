import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../apis/uploadFile";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: uploadFile,
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["documents"] });
      // Get previous hospital list before deleting
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["documents"]);
    },
  });

  return {
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
