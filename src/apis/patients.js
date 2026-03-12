import apiClient from "./apiClient";

export const getPatientDetails = async (name = "") => {
  try {
    const response = await apiClient.get(
      `bookings/patients/search?name=${encodeURIComponent(name)}`
    );

    return response?.data?.data ?? [];
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};