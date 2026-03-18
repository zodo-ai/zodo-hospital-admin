import apiClient from "./apiClient";

// ✅ Audience Count
export const getAudienceCount = async (params) => {
  const response = await apiClient.get(
    `/whatsapp-marketing/audience-count`,
    { params }
  );
  return response.data;
};

// ✅ Send Campaign
export const sendCampaign = async (payload) => {
  const response = await apiClient.post(
    `/whatsapp-marketing/send-campaign`,
    payload
  );
  return response.data;
};