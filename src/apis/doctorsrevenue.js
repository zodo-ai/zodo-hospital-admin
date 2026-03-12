import apiClient from "./apiClient";

export const getDoctorsRevenue = async (query = "") => {
  const response = await apiClient.get(
    `/revenue/doctors${query ? `?${query}` : ""}`
  );

  return response.data.data;
};