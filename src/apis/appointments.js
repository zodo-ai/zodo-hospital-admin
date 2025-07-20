import apiClient from "./apiClient";

export const getHospitalAppointments = async (id) => {
  const response = await apiClient.get(`/bookings/hospital/${id}/bookings`);
  return response?.data?.data;
};

export const getHospitalAppointmentsByQuery = async (id, query) => {
  const response = await apiClient.get(
    `/bookings/hospital/${id}/bookings?${query}`
  );
  return response?.data?.data;
};

export const getHospitalAppointmentsByStatus = async (id, status) => {
  const response = await apiClient.get(
    `/bookings/hospital/${id}/bookings?status=${status}`
  );
  return response?.data?.data;
};

export const getDoctorAppointments = async (id) => {
  const response = await apiClient.get(`/bookings/doctor/${id}/bookings`);
  return response?.data?.data;
};

export const getDoctorAppointmentsByQuery = async (id, query) => {
  const response = await apiClient.get(
    `/bookings/doctor/${id}/bookings?${query}`
  );
  return response?.data?.data;
};

export const createOfflineAppointment = async (data) => {
  const response = await apiClient.post(
    `/bookings/offline-doctor-appointment`,
    data
  );
  return response?.data?.data;
};

export const createOfflineServiceAppointment = async (data) => {
  const response = await apiClient.post(
    `/bookings/offline-hospital-service`,
    data
  );
  return response?.data;
};

export const exportHospitalBookings = async (hospital_id, query="") => {
  const response = await apiClient.get(
    `/bookings/hospital/${hospital_id}/export${query}`,
    {
      responseType: 'blob',
    }
  );
  return response.data; 
};

export const exportDoctotBookings = async (doctor_id) => {
  const response = await apiClient.get(
    `/bookings/doctor/${doctor_id}/export`,
    {
      responseType: 'blob',
    }
  );
  return response.data; 
};

export const approveAppiontment = async (id) => {
  const response = await apiClient.patch(`/bookings/${id}/mark-complete`);
  return response.data;
};