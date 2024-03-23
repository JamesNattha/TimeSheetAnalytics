import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.baseUrl
});

axiosInstance.interceptors.request.use(
  (response) => {
    response.headers['Authorization'] = localStorage.getItem('accessToken');
    response.headers['Access-Control-Allow-Origin'] = '*';
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
