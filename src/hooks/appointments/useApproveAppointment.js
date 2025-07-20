import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { approveAppiontment } from "../../apis/appointments";

export const useApproveAppointment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: approveAppiontment, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["appointments"] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Booking approved";
      // queryClient.setQueryData(["hospital", variables.id], data);
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success(message);
    },
    onError: (error, id, context) => {
      // Rollback if there is an error
      if (context?.previousAppointments) {
        queryClient.setQueryData(["appointments"], context.previousAppointments);
      }
      const errorMessage =
        error?.response?.data?.message || "Failed to edit Doctor";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
