import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust the base URL accordingly
});

export default api;
