import apiClient from "./apiClient";

export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await apiClient.post("/auth/forgot-password/request", data);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await apiClient.post("/auth/forgot-password/verify", data);
  return response.data;
};


export const updatePassword = async (data) => {
  const response = await apiClient.post("/auth/forgot-password/reset", data);
  return response.data;
};
