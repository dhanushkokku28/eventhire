import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitRequirement = async (data) => {
  try {
    const response = await apiClient.post("/requirements", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRequirements = async (filters = {}) => {
  try {
    const response = await apiClient.get("/requirements", { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
