import axios from 'axios';
import {FlightAwareApi} from '@env';

const axiosFlightAwareInstance = axios.create({
  baseURL: FlightAwareApi,
  withCredentials: true,
});

axiosFlightAwareInstance.interceptors.request.use(
  request => {
    console.log('Axios Request:', request);
    return request;
  },
  error => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  },
);

axiosFlightAwareInstance.interceptors.response.use(
  response => {
    console.log('Axios Response:', response);
    return response;
  },
  error => {
    console.error('Axios Response Error:', error);
    console.error(error.status);
    return Promise.reject(error);
  },
);

export default axiosFlightAwareInstance;
