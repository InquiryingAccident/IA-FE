import {
  getEncryptStorage,
  setEncryptStorage,
  removeEncryptStorage,
} from '@/utils/EncryptStorage';
import {User} from '@/types/user';
import axiosInstance from './axios';
import {Profile} from '@/types/domain';
import {storageKeys} from '@/constants';

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
  console.log(data);
  return data;
};

const postLogout = async (): Promise<void> => {
  console.log('auth - 로그아웃');
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
  const formData = new FormData();
  formData.append(storageKeys.REFRESH_TOKEN, refreshToken);
  await axiosInstance.post('/api/member/logout', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // await fetch('https://api.plane-accident-finder.world/api/member/logout')
  console.log('로그아웃 성공');
};

const deleteUser = async () => {
  console.log('유저 삭제 - auth.ts');
  const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
  await axiosInstance.delete('/api/member/withdraw', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  console.log('회원탈퇴 성공');
};

export type {RequestUser, RequestSignupUser, ResponseProfile, AuthToken};
export {
  postLogin,
  postSignup,
  getProfile,
  getAccessToken,
  postLogout,
  deleteUser,
};
