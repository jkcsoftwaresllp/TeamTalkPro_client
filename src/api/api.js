import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMessages = (conversationId, page, limit = 10) =>
  axiosInstance.get(`/chats/${conversationId}/messages?page=${page}&limit=${limit}`);