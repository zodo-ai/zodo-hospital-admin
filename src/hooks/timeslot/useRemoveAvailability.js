import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteAvailabilityById } from "../../apis/timeslots";

const useRemoveAvailability = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAvailabilityById, // API function to delete hospital
    onMutate: async (id) => {
      // Cancel any ongoing queries for hospitals to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ["availabilities"] });
      queryClient.setQueryData(["availabilities"], (oldAvailabilities) => ({
        ...oldAvailabilities,
        data: oldAvailabilities?.data?.filter(
          (availabilites) => availabilites.id !== id
        ),
      }));
    },
    onSuccess: () => {
      // Invalidate and refetch the hospitals query after a successful mutation
      // toast.success(message);
      queryClient.invalidateQueries(["availabilities"]);
    },
    onError: (error, id, context) => {
      console.log(error);

      const errotMessage =
        error?.response?.data?.message || "Failed to delete availability";
      // Rollback if there is an error
      if (context?.previousAvailabilities) {
        queryClient.setQueryData(
          ["availabilities"],
          context.previousAvailabilities
        );
      }
      toast.error(errotMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useRemoveAvailability;
