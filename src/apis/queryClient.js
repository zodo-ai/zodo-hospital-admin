import { QueryClient } from "@tanstack/react-query";

// Create a new QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 2, // Retry failed requests twice
    },
    mutations: {
      // Optional: Configure default mutation options
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});
