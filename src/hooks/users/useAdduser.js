// Custom hook for creating hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addUser } from "../../apis/users";

export const useAdduser = (hospitalId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addUser, // API function to create
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
    },
    onSuccess: (data) => {
      const message =
        data.message ||
        `${data.first_name || "User"} added successfully ${
          data.user_type ? "as " + data.user_type : ""
        }`;
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["staffs", hospitalId], data);
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
      const errorMessage =
        error?.response?.data?.validationErrors ||
        error?.response?.data?.message ||
        "Failed to add user";
      // Rollback if there is an error
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }
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
