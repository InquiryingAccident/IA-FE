import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {
  postLogin,
  postSignup,
  getAccessToken,
  ResponseProfile,
  getProfile,
  postLogout,
} from '@/api/auth';
import {
  storageKeys,
  queryKeys,
  numbers,
  errorMessages,
  alerts_ErrorMessage,
  alerts,
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

function useSignup(mutationOptions?: UseMutationCustomOptions<void>) {
  return useMutation({
    mutationFn: postSignup,
    onError: () => {
      Alert.alert(
        alerts_ErrorMessage.AUTH_SIGNUP_EMAIL.TITLE,
        alerts_ErrorMessage.AUTH_SIGNUP_EMAIL.DESCRIPTION,
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
    onError: () => {
      Alert.alert(
        alerts_ErrorMessage.AUTH_LOGIN.TITLE,
        alerts_ErrorMessage.AUTH_LOGIN.DESCRIPTION,
      );
    },
    ...mutationOptions,
  });
}

// function useGetRefreshToken() {
//   const {data, error, isSuccess, isError} = useQuery({
//     queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
//     queryFn: getAccessToken,
//     staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
//     refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
//     refetchOnReconnect: true,
//     refetchIntervalInBackground: true,
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       setHeader('Authorization', `Bearer ${data.accessToken}`);
//       setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (isError) {
//       removeHeader('Authorization');
//       removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//     }
//   }, [isError]);

//   return {isSuccess, isError};
// }
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
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

// function useLogout(mutationOptions?: UseMutationCustomOptions) {
//   console.log('useAuth-Logout');
//   return useMutation({
//     mutationFn: postLogout,
//     onSuccess: () => {
//       removeHeader('Authorization');
//       removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//       removeEncryptStorage(storageKeys.ACCESS_TOKEN);
//       queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
//     },
//     // onSettled: () => {
//     //   queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
//     // },
//     ...mutationOptions,
//   });
// }
function useLogout(mutationOptions?: UseMutationCustomOptions) {
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
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
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
    refreshTokenQuery,
    getProfileQuery,
  };
}

export default useAuth;
