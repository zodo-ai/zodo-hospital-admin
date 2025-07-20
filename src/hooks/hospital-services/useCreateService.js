// Custom hook for creating hospital
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addHospitalService } from "../../apis/hospitalServices";

export const useCreateService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addHospitalService, // API function to create
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["hospital-services"] });
    },
    onSuccess: (data) => {
      const message = data.message || "Department added successfully";
      queryClient.invalidateQueries(["services"]);
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
        error?.response?.data?.message || "Failed to add department";
      // Rollback if there is an error
      if (context?.previousServices) {
        queryClient.setQueryData(["services"], context.previousServices);
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
