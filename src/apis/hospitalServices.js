import apiClient from "./apiClient";

export const getServicesList = async () => {
  const response = await apiClient.get(`hospital-services`);
  return response.data?.data ?? [];
};

export const getHospitalServicesList = async (id) => {
  const response = await apiClient.get(`hospital-services?hospital_id=${id}`);
  return response.data?.data ?? [];
};

export const getHospitalServicesListByQuery = async (id, query) => {
  const response = await apiClient.get(
    `hospital-services?hospital_id=${id}&${query}`
  );  
  return response.data?.data ?? [];
};

export const getServicesById = async (id) => {
  const response = await apiClient.get(`/hospital-services/${id}`);
  return response?.data?.data || {};
};

export const addHospitalService = async (serviceData) => {
  const response = await apiClient.post("/hospital-services", serviceData);
  return response.data || [];
};

export const editHospitalService = async ({ id, data }) => {
  const response = await apiClient.put(`/hospital-services/${id}`, data);
  return response.data;
};

export const deleteHospitalService = async (id) => {
  const response = await apiClient.delete(`/hospital-services/${id}`);
  return response.data;
};

// export const deleteDepartment = async (id) => {
//   const response = await apiClient.delete(`/departments/${id}`);
//   return response.data;
// };

// export const editDepartment = async ({id, data}) => {
//   const response = await apiClient.patch(`/departments/${id}`, data);
//   return response.data;
// };
