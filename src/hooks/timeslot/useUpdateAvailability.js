// Custom hook for editing hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editAvailability } from "../../apis/timeslots";

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editAvailability, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["availabilities"] });
      const previousData = queryClient.getQueryData(["availabilities"]);
      return { previousData };
    },
    onError: (error, id, context) => {
      // Rollback if there is an error
      if (context?.previousHospitals) {
        // queryClient.setQueryData(["departments"], context.previousHospitals);
      }
      const errorMessage =
        error?.response?.data?.message || "Failed to update availability";
      toast.error(errorMessage);
    },
    onSettled: () => {
      // Invalidate the query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["availabilities"] });
    },  
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
