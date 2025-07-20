import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { assignTimeslot } from "../../apis/timeslots";

export const useAssignAppointments = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: assignTimeslot, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["doctors"] });
    },
    onSuccess: (data, variables) => {
      const message = data?.message || "Doctor updated successfully";
      // queryClient.setQueryData(["hospital", variables.id], data);
    //   queryClient.invalidateQueries({ queryKey: ["doctors", hospitalId] });
      queryClient.invalidateQueries({ queryKey: ["doctors", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success(message);
    },
    onError: (error, id, context) => {
      // Rollback if there is an error
      if (context?.previousDoctors) {
        queryClient.setQueryData(["doctors"], context.previousDoctors);
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
