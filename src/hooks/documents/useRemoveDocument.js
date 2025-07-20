// Custom hook for creating hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeDocument } from "../../apis/documents";

export const useRemoveDocuments = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeDocument, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["documents"] });
      // Get previous hospital list before deleting
    },
    onSuccess: (data) => {
      const message = data.message;
      // Invalidate and refetch the hospitals query after a successful mutation
      queryClient.invalidateQueries(["documents"]);
      toast.success(message);
    },
    onError: (error, id, context) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add documents";
      // Rollback if there is an error
      if (context?.previousDocuments) {
        queryClient.setQueryData(["documents"], context.previousDocuments);
      }
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
