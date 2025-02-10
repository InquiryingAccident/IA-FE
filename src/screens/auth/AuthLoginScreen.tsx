import React from 'react';
import {useAuth} from '@/utils/AuthContext';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_LOGIN
>;

function AuthLoginScreen() {
  const {isLogin} = useAuth();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

export default AuthLoginScreen;

const styles = StyleSheet.create({
  container: {},
});
