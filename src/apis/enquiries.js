import apiClient from "./apiClient";

export const getEnquiries = async (hospitalId, query) => {
  let url = `/enquiries?hospital_id=${hospitalId}`;
  if (query) {
    url += `&${query}`;
  }
  try {
    const response = await apiClient.get(url);
    return Array.isArray(response?.data) ? response.data : response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return [];
  }
};
