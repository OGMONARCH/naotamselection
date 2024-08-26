import axios from 'axios';

const API_URL =  'http://localhost:5000/api/vote';

const getCandidates = async () => {
  const response = await axios.get(`${API_URL}/candidates`);
  return response.data;
};

const submitVotes = async (votes) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/submit`, votes, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getResults = async () => {
  const response = await axios.get(`${API_URL}/results`);
  return response.data;
};

const verifyToken = async (token) => {
  const response = await axios.post(`${API_URL}/verify-token`, { token });
  return response.data;
};

export default {
  getCandidates,
  submitVotes,
  getResults,
  verifyToken,
};
