import api from "./api";

/**
 * Ask a question about the selected PDF
 */
export const askQuestion = async (pdfId, question) => {
  const response = await api.post("/chat", {
    pdfId,
    question,
  });

  return response.data;
};

/**
 * Generate AI summary for the selected PDF
 */
export const generateSummary = async (pdfId) => {
  const response = await api.post("/chat/summary", {
    pdfId,
  });

  return response.data;
};