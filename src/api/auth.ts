import {
  getEncryptStorage,
  setEncryptStorage,
  removeEncryptSTorage,
} from '@/utils/EncryptStorage';
import {User} from '@/types/user';
import axiosInstance from './axios';

type AuthToken = {
  accessToken: string;
  refreshToken: string;
};


// 서새찬 미친놈
// //모든 api formData 형식, post
const authLogin = async () => {};

const authSignup = async (formDataFile: FormData) => {
    const accessToken = getAccessToken();
    const response = axiosInstance.post('/api/auth/signup', formDataFile, headers:{
        Authorization: `Bearer ${accessToken}`
    })
};

const refreshToken = async ({
  refreshToken,
}: AuthToken): Promise<AuthToken> => {};
