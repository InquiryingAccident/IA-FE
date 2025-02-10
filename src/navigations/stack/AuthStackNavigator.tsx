import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '@/utils/AuthContext';
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
    <Stack.Navigator initialRouteName={authNavigations.AUTH_HOME}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={authNavigations.AUTH_LOGIN}
        component={AuthLoginScreen}
        options={{
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={authNavigations.AUTH_SIGNUP}
        component={AuthSignupScreen}
        options={{
          headerShown: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
