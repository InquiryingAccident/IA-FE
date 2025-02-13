import {authNavigations} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SIGNUP
>;

function AuthSignupScreen({navigation}: AuthScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>AuthSignupScreen</Text>
      </View>
    </SafeAreaView>
  );
}

export default AuthSignupScreen;
