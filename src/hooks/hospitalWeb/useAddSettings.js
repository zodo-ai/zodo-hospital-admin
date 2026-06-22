import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addSettings } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useAddSettings = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: addSettings,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["settings", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Settings saved successfully";
      queryClient.invalidateQueries({ queryKey: ["settings", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to save settings";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
