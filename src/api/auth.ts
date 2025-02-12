import {
  getEncryptStorage,
  setEncryptStorage,
  removeEncryptSTorage,
} from '@/utils/EncryptStorage';
import {User} from '@/types/user';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

type RequestSignupUser = {
  email: string;
  password: string;
  nickname: string;
};

type ResponseSignupUser = {};

type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

// 서새찬 미친놈
// //모든 api formData 형식, post
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<AuthToken> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  const response = await axiosInstance.post('/api/auth/login', formData);
  return JSON.parse(response.data);
};

const postSignup = async ({email, password, nickname}: RequestSignupUser) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('nickname', nickname);
  const response = await axiosInstance.post('/api/auth/signup', formData);
  return JSON.parse(response.data);
};
