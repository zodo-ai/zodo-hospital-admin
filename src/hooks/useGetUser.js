import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../apis/auth";
import { toast } from "react-toastify";

export const useGetUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: getUser, // API function to create
    onMutate: async () => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["user"] });
      // Get previous hospital list before deleting
    },
    onSuccess: () => {
      // const message = data.message;
      // Invalidate and refetch the hospitals query after a successful mutation
      queryClient.invalidateQueries("user");
      //   navigate("/manage-hospitals");
      // toast.success(message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    },
    onError: (error, id, context) => {
      const errorMessage = error?.response?.data?.message || "Failed";
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
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
