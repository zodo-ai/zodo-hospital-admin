import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDocument } from "../../apis/documents";

export const useDeleteDocument = (id) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDocument, // API function to delete hospital
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["documents", id] });
    },
    onSuccess: (data) => {
      const message = data.message;
      // Invalidate and refetch the hospitals query after a successful mutation
      queryClient.invalidateQueries(["documents", id]);
      queryClient.invalidateQueries(["documents"]);
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error, id, context) => {
      const errotMessage =
        error?.response?.data?.message || "Failed to delete document";
      // Rollback if there is an error
      if (context?.previousDocuments) {
        queryClient.setQueryData(["documents"], context.previousDocuments);
      }
      toast.error(errotMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["documents", id]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

