import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
    headers: {
        'withCredentials': 'false',
    },
});

export default api;
