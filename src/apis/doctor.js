import apiClient from "./apiClient";

export const getDoctorsListById = async (id) => {
  const response = await apiClient.get(`doctors?hospital_id=${id}`);
  return response?.data?.data ?? [];
};

export const getHospitalDoctorsListByQuery = async (id,query) => {
  const response = await apiClient.get(`doctors?hospital_id=${id}&${query}`);
  return response?.data?.data ?? [];
};

export const getDoctorsListByDoctorId = async (id) => {
  const response = await apiClient.get(`doctors/${id}`);
  return response?.data;
};

export const addDoctors = async (doctorsData) => {
  const response = await apiClient.post("/doctors", doctorsData);
  return response.data;
};


export const editDoctor = async ({ id, data }) => {
  const response = await apiClient.patch(`/doctors/${id}`, data);
  return response.data;
};

export const deleteDoctorById = async (id) => {
  const response = await apiClient.delete(`doctors/${id}`);
  return response?.data || {};
};