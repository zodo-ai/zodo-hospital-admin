import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editHospital } from "../../apis/hospital";
import { toast } from "react-toastify";

export const useEditHostpital = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: editHospital, // API function to create
      onMutate: async () => {
        // Cancel any ongoing queries for hospitals to prevent race conditions
        await queryClient.cancelQueries({ queryKey: ["hospitals"] });
      },
      onSuccess: (data, variables) => {
        const message = data?.message || "Hospital updated successfully";
        // queryClient.setQueryData(["hospital", variables.id], data);
        // queryClient.invalidateQueries({ queryKey: ["hospitals"] });
        queryClient.invalidateQueries({ queryKey: ["hospital", variables.id] });
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
        if (context?.previousHospitals) {
          queryClient.setQueryData(["hospital"], context.previousHospital);
        }
        const errorMessage =
          error?.response?.data?.message || "Failed to edit hospital";
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