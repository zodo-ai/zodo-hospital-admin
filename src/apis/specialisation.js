import apiClient from "./apiClient";

export const getSpecializations = async (id) => {
    const response = await apiClient.get(`/specialisations?hospital_id=${id}`);
    return response?.data?.data ?? [];
  };