import api from "./api";

// Upload PDF
export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file);

  const token = localStorage.getItem("token");

  const response = await api.post("/pdf/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all PDFs
export const getUserPDFs = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/pdf", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete PDF
export const deletePDF = async (pdfId) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/pdf/${pdfId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};