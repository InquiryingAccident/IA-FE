import React, {useEffect} from 'react';
import useAuth from '@/hooks/queries/useAuth';
// import {useAuth} from '@/utils';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '../tab/MainTabNavigator';

function RootNavigator() {
  // const {isLogin} = useAuth();
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
