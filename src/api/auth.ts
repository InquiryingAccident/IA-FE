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

type ResponseSignupUser = {
  createDate: string;
  updateDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  memberId: string;
  email: string;
  password: string;
  nickname: string;
  profileUrl: string;
  role: string[];
  accountStatus: string;
  lastLonginTime: string;
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
  const {data} = await axiosInstance.post('/api/auth/login', formData);
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
  const {data} = await axiosInstance.post('/api/auth/signup', formData);
  return data;
};

// const postLogout = async (): Promise<void> => {
//   await axiosInstance.post('')
// }

const postRefresh = async (): Promise<AuthToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const formData = new FormData();
  formData.append('refreshToken', refreshToken);
  const {data} = await axiosInstance.post('/api/auth/refresh', formData);
  return data;
};

export type {RequestUser, RequestSignupUser, ResponseSignupUser, AuthToken};
export {postLogin, postSignup, postRefresh};
