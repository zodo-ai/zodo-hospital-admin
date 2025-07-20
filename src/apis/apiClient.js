import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Use the base URL from config
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true, // Include credentials in requests
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  (config) => {
    // const {accessToken} = useAuth();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor — Handle 401 (unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Token expired. Logging out...");
      localStorage.removeItem("token"); // Remove the token from local storage
      sessionStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
