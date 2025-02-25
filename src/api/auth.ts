import {
  getEncryptStorage,
  setEncryptStorage,
  removeEncryptStorage,
} from '@/utils/EncryptStorage';
import {User} from '@/types/user';
import axiosInstance from './axios';
import {Profile} from '@/types/domain';

type RequestUser = {
  email: string;
  password: string;
};

type RequestSignupUser = {
  email: string;
  password: string;
  nickname: string;
};

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
  const {data} = await axiosInstance.post('/api/auth/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const postSignup = async ({
  email,
  password,
  nickname,
}: RequestSignupUser): Promise<void> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('nickname', nickname);
  const {data} = await axiosInstance.post('/api/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// const postLogout = async (): Promise<void> => {
//   await axiosInstance.post('')
// }

const getAccessToken = async (): Promise<AuthToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const formData = new FormData();
  formData.append('refreshToken', refreshToken);
  const {data} = await axiosInstance.post('/api/auth/refresh', formData, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

type ResponseProfile = Profile;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.post('/api/member/my-info', {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const postLogout = async (): Promise<void> => {
  console.log('useAuth-로그아웃');
  // await axiosInstance.post('/api/auth/logout');
};

export type {RequestUser, RequestSignupUser, ResponseProfile, AuthToken};
export {postLogin, postSignup, getProfile, getAccessToken, postLogout};
