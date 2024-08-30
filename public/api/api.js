import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getData = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;
