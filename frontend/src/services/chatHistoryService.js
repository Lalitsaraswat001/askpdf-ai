import api from "./api";

export const getChatHistory = async (pdfId) => {
  const response = await api.get(`/chat/history/${pdfId}`);
  return response.data;
};