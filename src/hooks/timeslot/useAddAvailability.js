import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAvailability } from "../../apis/timeslots";

export const useAddAvailability = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAvailability,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["availabilities"] });
      const previousData = queryClient.getQueryData(["availabilities"]);
      return { previousData };
    },
    onError: (error, _vars, context) => {
      const msg =
        error?.response?.data?.message || "Failed to add availability";
      if (context?.previousData) {
        queryClient.setQueryData(["availabilities"], context.previousData);
      }
      toast.error(msg);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["availabilities"] });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
