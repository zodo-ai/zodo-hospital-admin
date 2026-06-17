import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addTestimonial } from "../../apis/hospitalWeb";
import { useAuth } from "../useAuth";

export const useAddTestimonial = () => {
  const queryClient = useQueryClient();
  const { hospitalId } = useAuth();

  const mutation = useMutation({
    mutationFn: addTestimonial,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["testimonials", hospitalId] });
    },
    onSuccess: (data) => {
      const message = data?.message || "Testimonial added successfully";
      queryClient.invalidateQueries({ queryKey: ["testimonials", hospitalId] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to add testimonial";
      toast.error(errorMessage);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
