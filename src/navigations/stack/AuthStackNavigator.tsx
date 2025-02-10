import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import AuthLoginScreen from '@/screens/auth/AuthLoginScreen';
import AuthSignupScreen from '@/screens/auth/AuthSignupScreen';
import {authNavigations} from '@/constants';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.AUTH_LOGIN]: undefined;
  [authNavigations.AUTH_SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.AUTH_LOGIN}
        component={AuthLoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={authNavigations.AUTH_SIGNUP}
        component={AuthSignupScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
