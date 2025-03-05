import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {
  postLogin,
  postSignup,
  getAccessToken,
  ResponseProfile,
  getProfile,
  postLogout,
  deleteUser,
} from '@/api/auth';
import {
  storageKeys,
  queryKeys,
  numbers,
  alerts_ErrorMessage,
} from '@/constants';
import {
  getEncryptStorage,
  setEncryptStorage,
  removeEncryptStorage,
} from '@/utils/EncryptStorage';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeHeader, setHeader} from '@/utils/axiosInstance';
import queryClient from '@/api/queryClient';
import {Alert} from 'react-native';
import {useUserStore} from '@/store/userStore';

function useSignup(mutationOptions?: UseMutationCustomOptions<void>) {
  return useMutation({
    mutationFn: postSignup,
    onError: () => {
      Alert.alert(
        alerts_ErrorMessage.AUTH_SIGNUP.TITLE,
        alerts_ErrorMessage.AUTH_SIGNUP.DESCRIPTION,
      );
    },
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    // onError: (error: any) => {
    //   Alert.alert(
    //     alerts_ErrorMessage.AUTH_LOGIN.TITLE,
    //     alerts_ErrorMessage.AUTH_LOGIN.DESCRIPTION,
    //     [
    //       {
    //         text: '회원가입',
    //         onPress: () => {},
    //       },
    //       {
    //         text: '확인',
    //         style: 'cancel',
    //       },
    //     ],
    //   );
    // },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const refreshToken = getEncryptStorage(storageKeys.REFRESH_TOKEN); // 동기적으로 가져올 수 있다면
  const {data, error, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    enabled: Boolean(refreshToken), // 토큰이 있어야 실행
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  const setUser = useUserStore(state => state.setUser);
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    select: data => {
      setUser(data);
      return data;
    },
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  const clearUser = useUserStore(state => state.clearUser);
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeEncryptStorage(storageKeys.ACCESS_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
      queryClient.removeQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.removeQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
      clearUser();
    },
    ...mutationOptions,
  });
}

function useDelete(mutationOptions?: UseMutationCustomOptions) {
  const clearUser = useUserStore(state => state.clearUser);
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeEncryptStorage(storageKeys.ACCESS_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
      queryClient.removeQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.removeQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
      clearUser();
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const deleteMutation = useDelete();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;

  return {
    isLogin,
    signupMutation,
    loginMutation,
    logoutMutation,
    deleteMutation,
    refreshTokenQuery,
    getProfileQuery,
  };
}

export default useAuth;
