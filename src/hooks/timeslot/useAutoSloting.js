// Custom hook for editing hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAutoslot } from "../../apis/timeslots";

export const useAutoSloting = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateAutoslot, // API function to create
    onMutate: async () => {
      
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["doctors"] });
      const previousData = queryClient.getQueryData(["doctors"]);
      return { previousData };
    },
    onSuccess: (data)=>{
      const doctor_id = data?.data?.id;
      toast.success(data?.message || "Auto booking setting updated successfully");
      queryClient.invalidateQueries({ queryKey: ["doctor", doctor_id] });
    },
    onError: (error, id, context) => {
      // Rollback if there is an error
      if (context?.previousDoctors) {
        // queryClient.setQueryData(["departments"], context.previousHospitals);
      }
      const errorMessage =
        error?.response?.data?.message || "Failed to update availability";
      toast.error(errorMessage);
    },
    onSettled: () => {
      // Invalidate the query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
