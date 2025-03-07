import axiosInstance from '@/api/axios';
import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import {authNavigations, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {validateSignup} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Alert,
} from 'react-native';

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

  const checkUsingEmail = async () => {
    try {
      const emailValue = signup.values.email;
      console.log(emailValue);
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
      console.log('이메일 체크 통신 성공');
      if (response.status === 200) {
        const data = await response.data;

        if (data == true) {
          Alert.alert('사용가능한 이메일입니다.');
        } else {
          Alert.alert(
            '사용 불가능한 이메일입니다.',
            '다른 이메일을 사용해 주세요.',
          );
        }
      } else {
        if (response.status === 201) {
          Alert.alert('신호 201');
        } else {
          Alert.alert('왜이래?');
          console.log(response.status);
        }
      }
    } catch (error) {
      Alert.alert(`체크하는 도중 에러가 있었습니다.\n다시 시도해주세요`);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              flex: 0.8,
            }}>
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
          </View>
          <Pressable
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={checkUsingEmail}>
            <Text
              style={{
                color: colors.BLUE_BASIC,
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              이메일{`\n`}체크
            </Text>
          </Pressable>
        </View>
        {/* <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        /> */}
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
