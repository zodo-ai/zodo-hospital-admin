import apiClient from "./apiClient";

export const getBanners = async (hospitalId) => {
  try {
    const response = await apiClient.get(`/hospital-web/banners/${hospitalId}`);
    return Array.isArray(response?.data) ? response.data : response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

export const addBanner = async (data) => {
  const response = await apiClient.post(`/hospital-web/banners`, data);
  return response?.data || {};
};

export const updateBanner = async ({ id, data }) => {
  const response = await apiClient.patch(`/hospital-web/banners/${id}`, data);
  return response?.data || {};
};

export const getGallery = async (hospitalId) => {
  try {
    const response = await apiClient.get(`/hospital-web/gallery/${hospitalId}`);
    return Array.isArray(response?.data) ? response.data : response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
};

export const addGallery = async (data) => {
  const response = await apiClient.post(`/hospital-web/gallery`, data);
  return response?.data || {};
};

export const updateGallery = async ({ id, data }) => {
  const response = await apiClient.patch(`/hospital-web/gallery/${id}`, data);
  return response?.data || {};
};

export const getTestimonials = async (hospitalId) => {
  try {
    const response = await apiClient.get(`/hospital-web/testimonials/${hospitalId}`);
    return Array.isArray(response?.data) ? response.data : response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

export const addTestimonial = async (data) => {
  const response = await apiClient.post(`/hospital-web/testimonials`, data);
  return response?.data || {};
};

export const updateTestimonial = async ({ id, data }) => {
  const response = await apiClient.patch(`/hospital-web/testimonials/${id}`, data);
  return response?.data || {};
};

export const getSettings = async (hospitalId) => {
  try {
    const response = await apiClient.get(`/hospital-web/settings/${hospitalId}`);
    return response?.data?.data || response?.data || null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

export const addSettings = async (data) => {
  const response = await apiClient.post(`/hospital-web/settings`, data);
  return response?.data || {};
};

export const updateSettings = async ({ id, data }) => {
  const response = await apiClient.patch(`/hospital-web/settings/${id}`, data);
  return response?.data || {};
};



