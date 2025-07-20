import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteStaffByUserid } from "../../apis/users";

const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteStaffByUserid, // API function to delete hospital
    onMutate: async (id) => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["staffs"] });
      // Optimistically update the cache
      queryClient.setQueryData(["staffs"], (oldStaffs) => ({
        ...oldStaffs,
        data: oldStaffs?.data?.filter((staff) => staff.id !== id),
      }));
    },
    onSuccess: (data) => {
      const message = data.message || "User deleted successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["staffs"]);
    },
    onError: (error, id, context) => {        
      const errotMessage = error?.response?.data?.message || "Failed to delete hospital";
      // Rollback if there is an error
      if (context?.previousStaffs) {
        queryClient.setQueryData(["staffs"], context.previousStaffs);
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
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useDeleteStaff;
