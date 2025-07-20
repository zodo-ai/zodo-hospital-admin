import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteHospitalService } from "../../apis/hospitalServices";

const useDeleteHospitalServices = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteHospitalService, // API function to delete hospital
    onMutate: async (id) => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["services"] });
      // Optimistically update the cache
      queryClient.setQueryData(["services"], (oldServices) => ({
        ...oldServices,
        data: oldServices?.data?.filter((service) => service.id !== id),
      }));
    },
    onSuccess: (data) => {
      const message = data.message || "Successfully deleted service";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["services"]);
    },
    onError: (error, id, context) => {
      const errotMessage = error?.response?.data?.message || "Failed to delete doctor";
      // Rollback if there is an error
      if (context?.previousServices) {
        queryClient.setQueryData(["doctors"], context.previousServices);
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

export default useDeleteHospitalServices;
