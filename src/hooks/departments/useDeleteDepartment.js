import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDepartment } from "../../apis/departments";

const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDepartment, // API function to delete hospital
    onMutate: async (id) => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["departments"] });
      queryClient.setQueryData(["departments"], (oldDepartments) => ({
        ...oldDepartments,
        data: oldDepartments?.data?.filter((department) => department.id !== id),
      }));
    },
    onSuccess: (data) => {
      const message = data.message;
      // Invalidate and refetch the hospitals query after a successful mutation
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["departments"]);

    },
    onError: (error, id, context) => {
      console.log(error);

      const errotMessage =
        error?.response?.data?.message || "Failed to delete Department";
      // Rollback if there is an error
      if (context?.previousDepartments) {
        queryClient.setQueryData(["departments"], context.previousDepartments);
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

export default useDeleteDepartment;
