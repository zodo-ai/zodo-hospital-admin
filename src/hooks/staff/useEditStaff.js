import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStaffByUserid } from "../../apis/users";
import { useAuth } from "../useAuth";

export const useEditStaff = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth(); // Assuming useAuth provides hospitalId
  const mutation = useMutation({
    mutationFn: updateStaffByUserid, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["staff"] });
    },
    onSuccess: (data, variables) => {      
      const message = data?.message || "Staff updated successfully";
      queryClient.invalidateQueries({ queryKey: ["staff", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["staffs", hospitalId] });
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
      if (context?.previousStaff) {
        queryClient.setQueryData(["staff"], context.previousStaff);
      }
      const errorMessage =
        error?.response?.data?.message || "Failed to edit staff";
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
