import axiosInstance from '@/api/axios';
import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import {authNavigations, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {validateSignup} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, Alert} from 'react-native';

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
  const [availableEmail, setAvailableEmail] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);

  const handleSubmit = () => {
    const {email, password, nickname} = signup.values;
    signupMutation.mutate(
      {
        email,
        password,
        nickname,
      },
      {
        onSuccess: () => {
          loginMutation.mutate({email, password});
        },
      },
    );
  };

  const checkUsingEmail = async () => {
    try {
      const emailValue = signup.values.email;
      const newFormData = new FormData();
      newFormData.append('email', emailValue);

      const response = await axiosInstance.post(
        '/api/member/check-email',
        newFormData,
        {
          headers: {
            Authorization: null,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        const data = response.data;
        console.log({data});
        if (data === true) {
          setAvailableEmail(true);
          setVerified(true);
          setMessage('사용 가능한 이메일입니다.');
        } else {
          setAvailableEmail(false);
          setVerified(false);
          setMessage('이미 사용 중인 이메일입니다.');
          Alert.alert(
            '사용 불가능한 이메일입니다.',
            '다른 이메일을 사용해 주세요.',
          );
        }
      } else {
        setAvailableEmail(false);
        setMessage('중복 확인에 실패했습니다.');
      }
    } catch (error) {
      setAvailableEmail(false);
      setVerified(false);
      setMessage('중복 확인 도중 에러가 발생했습니다.');
      Alert.alert('체크하는 도중 에러가 있었습니다.\n다시 시도해주세요');
    }
  };

  const handleEmailChange = (text: string) => {
    setAvailableEmail(false);
    setVerified(false);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          title="아이디"
          placeholder="이메일"
          inputMode="email"
          returnKeyType="next"
          error={signup.errors.email}
          touched={signup.touched.email}
          check={true}
          available={availableEmail}
          ischecked={verified}
          checkedButton={checkUsingEmail}
          message={
            message !== '' ? message : '이메일을 입력 후 중복확인을 해주세요'
          }
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email', {
            onChangeText: handleEmailChange,
          })}
        />
        <InputField
          ref={passwordRef}
          title="비밀번호"
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          secureTextEntry
          returnKeyType="next"
          error={signup.errors.password}
          touched={signup.touched.password}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          title="비밀번호 확인"
          placeholder="비밀번호 확인"
          secureTextEntry
          returnKeyType="next"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          onSubmitEditing={() => nicknameRef.current?.focus()}
          {...signup.getTextInputProps('passwordConfirm')}
        />
        <InputField
          ref={nicknameRef}
          title="닉네임"
          placeholder="닉네임"
          returnKeyType="done"
          error={signup.errors.nickname}
          touched={signup.touched.nickname}
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('nickname')}
        />
      </View>
      <CustomButton
        label="회원가입"
        onPress={handleSubmit}
        inValid={
          !(
            signup.values.email &&
            signup.values.password &&
            signup.values.passwordConfirm &&
            signup.values.nickname
          )
        }
      />
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
