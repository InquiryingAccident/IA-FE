import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.plane-accident-finder-world',
  withCredentials: true,
});
