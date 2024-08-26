import axios from 'axios';

const API_URL =  'http://localhost:5000/api/admin';

const createCandidate = async (candidateData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/create-candidate`, candidateData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const manipulateVotes = async (candidateName, newVoteCount) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/manipulate-votes`, { candidateName, newVoteCount }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const changeVoterVotes = async (voterEmail, newVoteCount) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/change-voter-votes`, { voterEmail, newVoteCount }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  createCandidate,
  manipulateVotes,
  changeVoterVotes,
};
