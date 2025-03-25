import React, {useRef} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {alerts_ErrorMessage, authNavigations, errorMessages} from '@/constants';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import KeyboardAvoid from '@/utils/KeyboardAvoid';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_LOGIN
>;

function AuthLoginScreen({navigation}: AuthScreenProps) {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error => {
        Alert.alert(
          alerts_ErrorMessage.AUTH_LOGIN.TITLE,
          alerts_ErrorMessage.AUTH_LOGIN.DESCRIPTION,
          [
            {
              text: '회원가입',
              onPress: () => navigation.navigate(authNavigations.AUTH_SIGNUP),
            },
            {
              text: '확인',
              style: 'cancel',
            },
          ],
        );
      },
    });
  };

  return (
    <KeyboardAvoid>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            source={require('@/assets/logo/Logo.png')}
            style={styles.image}
          />
          <InputField
            title="아이디"
            autoFocus
            placeholder="이메일"
            error={login.errors.email}
            touched={login.touched.email}
            inputMode="email"
            returnKeyType="next"
            // message="올바른 이메일 형식입니다."
            // blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
            {...login.getTextInputProps('email')}
          />
          <InputField
            title="비밀번호"
            ref={passwordRef}
            placeholder="비밀번호"
            error={login.errors.password}
            touched={login.touched.password}
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={handleSubmit}
            {...login.getTextInputProps('password')}
          />
        </View>
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          inValid={!login.values.password}
          onPress={handleSubmit}
        />
      </SafeAreaView>
    </KeyboardAvoid>
  );
}

export default AuthLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').width * 0.8,
  },
});
