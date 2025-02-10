import {authNavigations} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SIGNUP
>;

function AuthSignupScreen() {
  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
}

export default AuthSignupScreen;
