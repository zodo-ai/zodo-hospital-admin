import apiClient from "./apiClient";

export const getDistrict = async () => {
    const response = await apiClient.get(`/districts`);  
    return response?.data?.data;
  };