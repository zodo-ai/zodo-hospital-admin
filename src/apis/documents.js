import apiClient from "./apiClient";

export const deleteDocument = async (id) => {
  const response = await apiClient.delete(`/documents/${id}`);
  return response.data;
};

export const removeDocument = async (data) =>{
  const response = await apiClient.post(`/file-upload/delete`,data);
  return response.data;
}