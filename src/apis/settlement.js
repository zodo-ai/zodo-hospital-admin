import apiClient from "./apiClient";

export const getSettlementsByHospitalId = async (id, query) => {
  const response = await apiClient.get(`/settlements?hospital_id=${id}${query}`);
  return response?.data?.data ?? [];
};

export const getSettlementsByHospitalIdQuery = async (id, query) => {
  const response = await apiClient.get(
    `/settlements?hospital_id=${id}&${query}`
  );
  return response?.data?.data ?? [];
};

export const initiateSettlement = async (settlementData) => {
  const response = await apiClient.post("/settlements", settlementData);
  return response.data;
};

export const fetchWallet = async (hospital_id) => {
  const response = await apiClient.get(`/wallet/hospital/${hospital_id}`);
  return response?.data?.data ?? {};
};

export const exportHospitalTransactions = async (hospital_id) => {
  const response = await apiClient.get(
    `transactions/hospitals/${hospital_id}/export`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const exportHospitalSettlements = async (hospital_id) => {
  const response = await apiClient.get(
    `settlements/export?hospital_id=${hospital_id}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const getHospitalTransactions = async (id,query) => {
  const response = await apiClient.get(`transactions/hospitals/${id}?${query}`);
  return response?.data?.data ?? [];
};
