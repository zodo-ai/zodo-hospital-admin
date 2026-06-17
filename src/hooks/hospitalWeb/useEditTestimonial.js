import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateTestimonial } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useEditTestimonial = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: updateTestimonial,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["testimonials", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Testimonial updated successfully";
      queryClient.invalidateQueries({ queryKey: ["testimonials", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update testimonial";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
