import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isAdmin', response.data.isAdmin);
  }
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${API_URL}/register`, credentials);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
};

export default {
  login,
  register,
  logout,
};
