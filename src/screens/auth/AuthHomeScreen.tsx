import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CustomButton from '@/components/custom/CustomButton';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/logo/Logo_IA.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>App Name</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인"
          onPress={() => navigation.navigate(authNavigations.AUTH_LOGIN)}
        />
        <CustomButton
          label="회원가입"
          onPress={() => navigation.navigate(authNavigations.AUTH_SIGNUP)}
        />
      </View>
    </View>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
  },
});
