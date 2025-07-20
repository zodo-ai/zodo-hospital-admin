import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { initiateSettlement } from "../../apis/settlement";

export const useInitiateSettlement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: initiateSettlement, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for doctors to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["settlements"] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Settlement initiated successfully";
      queryClient.invalidateQueries(["settlements"]);
      //   navigate("/manage-doctors");
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
      // Rollback if there is an error
      if (context?.previousSettlements) {
        queryClient.setQueryData(["settlements"], context.previousSettlements);
      }
      const errorMessage =
        error?.response?.data?.validationErrors ||
        error?.response?.data?.message ||
        "Failed to initiate settlement";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
