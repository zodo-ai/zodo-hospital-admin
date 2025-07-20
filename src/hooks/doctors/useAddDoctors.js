import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addDoctors } from "../../apis/doctor";
import { useAuth } from "../useAuth";

export const useAddDoctors = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();
  const mutation = useMutation({
    mutationFn: addDoctors, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for doctors to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["doctors"] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Doctor added successfully";
      queryClient.invalidateQueries(["doctors", hospitalId]);
      //   navigate("/manage-doctors");
      toast.success(message);
    },
    onError: (error, id, context) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to create doctor";
      // Rollback if there is an error
      if (context?.previousDoctors) {
        queryClient.setQueryData(
          ["doctors", hospitalId],
          context.previousDoctors
        );
      }
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
