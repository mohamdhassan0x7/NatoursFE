// axios-config.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://natours-eight-xi.vercel.app/api/v1/', 
    withCredentials: true,
    credentials: 'include',
});

export default axiosInstance;
