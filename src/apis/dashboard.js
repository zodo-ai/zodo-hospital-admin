import apiClient from "./apiClient";

export const getDashboardData = async () => {
  const response = await apiClient.get(`/dashboard/counts`);
  return response?.data || {};
};

export const getAnalyticsData = async (hospital_id, query) => {
  const response = await apiClient.get(`/dashboard/bookings-by-month?hospital_id=${hospital_id}&${query}`);
  return response?.data || {};
};

export const getHospitalAnalytics = async (id) => {
  const response = await apiClient.get(`/dashboard/hospitals/${id}`);
  return response?.data || [];
};

export const getDoctorAnalytics = async (id) => {
  const response = await apiClient.get(`/dashboard/doctors/${id}`);
  return response?.data || [];
};
