import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchMessages = async (chatId, page = 1, limit = 20, keyword = '') => {
  const endpoint = keyword
    ? `${BASE_URL}/messages/${chatId}/search?keyword=${keyword}&page=${page}`
    : `${BASE_URL}/messages/${chatId}?page=${page}&limit=${limit}`;

  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

