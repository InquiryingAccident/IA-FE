import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '@/utils/AuthContext';
import {Text} from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import {getEncryptStorage} from '@/utils/EncryptStorage';
import {storageKeys} from '@/constants/keys';
import axiosInstance from '@/api/axios';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isLogin, setIsLogin} = useAuth();

  const refreshAuth = async () => {
    const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
    if (!refreshToken) {
      offLogin();
      return;
    }
    const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);
    const sendFormData = new FormData();
    sendFormData.append('refreshToken', refreshToken);
    sendFormData.append('accessToken', accessToken);
    const response = await axiosInstance.post('/auth/refresh', sendFormData);
    if (response.status === 200) {
      onLogin();
    } else {
      offLogin();
    }
  };
  const onLogin = () => {
    setIsLogin(true);
  };
  const offLogin = () => {
    setIsLogin(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return isLogin ? <Text>로그인 성공</Text> : <AuthStackNavigator />;
};

export default RootNavigator;
