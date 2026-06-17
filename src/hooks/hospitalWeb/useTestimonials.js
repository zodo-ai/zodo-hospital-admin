import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../../apis/hospitalWeb";

export const useTestimonials = (hospitalId) => {
  return useQuery({
    queryKey: ["testimonials", hospitalId],
    queryFn: () => getTestimonials(hospitalId),
    enabled: !!hospitalId,
  });
};
