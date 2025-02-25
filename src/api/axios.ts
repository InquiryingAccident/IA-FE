import axios from 'axios';
import {ServerBaseUrl} from '@env';

const axiosInstance = axios.create({
  baseURL: ServerBaseUrl,
  withCredentials: true,
});

export default axiosInstance;
