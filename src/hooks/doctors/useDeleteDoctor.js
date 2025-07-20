import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteDoctorById } from "../../apis/doctor";

const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDoctorById, // API function to delete hospital
    onMutate: async (id) => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["doctors"] });
      // Optimistically update the cache
      queryClient.setQueryData(["doctors"], (oldDoctors) => ({
        ...oldDoctors,
        data: oldDoctors?.data?.filter((doctor) => doctor.id !== id),
      }));
    },
    onSuccess: (data) => {
      const message = data.message || "Successfully deleted doctor";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["doctors"]);
    },
    onError: (error, id, context) => {
      const errotMessage = error?.response?.data?.message || "Failed to delete doctor";
      // Rollback if there is an error
      if (context?.previousDoctors) {
        queryClient.setQueryData(["doctors"], context.previousDoctors);
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

export default useDeleteDoctor;
