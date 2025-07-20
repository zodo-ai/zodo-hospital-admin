import apiClient from "./apiClient";

export const uploadFile = async (formData) => {
  const response = await apiClient.post(`/file-upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });  
  return response.data;
};
