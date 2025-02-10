import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '@/utils/AuthContext';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isLogin, setIsLogin} = useAuth();

  return isLogin ? <Text>로그인 성공</Text> : <Text>로그인 실패</Text>;
};

export default RootNavigator;
