// Custom hook for creating hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createOfflineAppointment } from "../../apis/appointments";

export const useCreateOfflineAppointments = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createOfflineAppointment, // API function to create
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["appointments"] });
    },
    onSuccess: (data) => {
      const message = data.message || "Appointment initiated successfully";
      queryClient.invalidateQueries(["appointments"]);
      toast.success(message);
    },
    onError: (error, id, context) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to initiate appointment";
      // Rollback if there is an error
      if (context?.previousAppointments) {
        queryClient.setQueryData(["appointments"], context.previousAppointments);
      }
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
