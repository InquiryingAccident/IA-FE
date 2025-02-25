import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import {authNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {validateSignup} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SIGNUP
>;

function AuthSignupScreen({navigation}: AuthScreenProps) {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: '', nickname: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password, nickname} = signup.values;
    signupMutation.mutate(
      {
        email,
        password,
        nickname,
      },
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
  };
  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('email', signup.values.email);
  //     formData.append('password', signup.values.password);
  //     formData.append('nickname', signup.values.nickname);
  //     const response = await axiosInstance.post('/api/auth/signup', formData);
  //     if (response.status === 200) {
  //       Alert.alert('회원가입 성공');
  //     } else {
  //       Alert.alert('회원가입 실패');
  //     }
  //   } catch (error) {
  //     Alert.alert('에러');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={() => nicknameRef.current?.focus()}
          {...signup.getTextInputProps('passwordConfirm')}
        />
        <InputField
          ref={nicknameRef}
          placeholder="닉네임"
          error={signup.errors.nickname}
          touched={signup.touched.nickname}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('nickname')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

export default AuthSignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
