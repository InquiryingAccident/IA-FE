// import axiosInstance from '@/api/axios';
// import CustomButton from '@/components/custom/CustomButton';
// import InputField from '@/components/custom/InputField';
// import {authNavigations} from '@/constants';
// import useAuth from '@/hooks/queries/useAuth';
// import useForm from '@/hooks/useForm';
// import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
// import {validateSignup} from '@/utils';
// import {StackScreenProps} from '@react-navigation/stack';
// import React, {useRef} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TextInput,
//   Alert,
// } from 'react-native';

// type AuthScreenProps = StackScreenProps<
//   AuthStackParamList,
//   typeof authNavigations.AUTH_SIGNUP
// >;

// function AuthSignupScreen({navigation}: AuthScreenProps) {
//   const {signupMutation, loginMutation} = useAuth();
//   const passwordRef = useRef<TextInput | null>(null);
//   const passwordConfirmRef = useRef<TextInput | null>(null);
//   const nicknameRef = useRef<TextInput | null>(null);
//   const signup = useForm({
//     initialValue: {email: '', password: '', passwordConfirm: '', nickname: ''},
//     validate: validateSignup,
//   });

//   const handleSubmit = () => {
//     const {email, password, nickname} = signup.values;
//     signupMutation.mutate(
//       {
//         email,
//         password,
//         nickname: nickname,
//       },
//       {
//         onSuccess: () => loginMutation.mutate({email, password}),
//       },
//     );
//   };
//   const postSignupLogin = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('email', signup.values.email);
//       formData.append('password', signup.values.password);
//       formData.append('nickname', signup.values.nickname);
//       const response = await axiosInstance.post('/api/auth/signup', formData);
//       if (response.status === 200) {
//         Alert.alert('회원가입 성공');
//       } else {
//         Alert.alert('회원가입 실패');
//       }
//     } catch (error) {
//       Alert.alert('에러');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputContainer}>
//         <InputField
//           autoFocus
//           placeholder="이메일"
//           error={signup.errors.email}
//           touched={signup.touched.email}
//           inputMode="email"
//           returnKeyType="next"
//           blurOnSubmit={false}
//           onSubmitEditing={() => passwordRef.current?.focus()}
//           {...signup.getTextInputProps('email')}
//         />
//         <InputField
//           ref={passwordRef}
//           placeholder="비밀번호"
//           textContentType="oneTimeCode"
//           error={signup.errors.password}
//           touched={signup.touched.password}
//           secureTextEntry
//           returnKeyType="next"
//           blurOnSubmit={false}
//           onSubmitEditing={() => passwordConfirmRef.current?.focus()}
//           {...signup.getTextInputProps('password')}
//         />
//         <InputField
//           ref={passwordConfirmRef}
//           placeholder="비밀번호 확인"
//           error={signup.errors.passwordConfirm}
//           touched={signup.touched.passwordConfirm}
//           secureTextEntry
//           returnKeyType="join"
//           onSubmitEditing={handleSubmit}
//           {...signup.getTextInputProps('passwordConfirm')}
//         />
//         <InputField
//           ref={nicknameRef}
//           placeholder="닉네임"
//           error={signup.errors.nickname}
//           touched={signup.touched.nickname}
//           returnKeyType="join"
//           onSubmitEditing={handleSubmit}
//           {...signup.getTextInputProps('nickname')}
//         />
//       </View>
//       <CustomButton label="회원가입" onPress={postSignupLogin} />
//     </SafeAreaView>
//   );
// }

// export default AuthSignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 30,
//   },
//   inputContainer: {
//     gap: 20,
//     marginBottom: 30,
//   },
// });
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import axiosInstance from '@/api/axios';
import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {authNavigations} from '@/constants';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_SIGNUP
>;

function AuthSignupScreen({navigation}: AuthScreenProps) {
  // 각각의 값들을 useState로 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  // 각 InputField 포커싱을 위한 ref
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);

  const handleSignupAndLogin = async () => {
    if (!email || !password || !nickname) {
      Alert.alert('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const signupFormData = new FormData();
      signupFormData.append('email', email);
      signupFormData.append('password', password);
      signupFormData.append('nickname', nickname);
      Alert.alert(email, password);
      Alert.alert(nickname);

      const signupResponse = await axiosInstance.post(
        '/api/auth/signup',
        signupFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (signupResponse.status === 201) {
        Alert.alert('회원가입 성공');
      } else {
        Alert.alert('회원가입 실패');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('에러가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          // useForm 사용 대신 value/onChangeText로 직접 관리
          value={email}
          onChangeText={setEmail}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          value={password}
          onChangeText={setPassword}
        />

        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => nicknameRef.current?.focus()}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />

        <InputField
          ref={nicknameRef}
          placeholder="닉네임"
          returnKeyType="done"
          onSubmitEditing={handleSignupAndLogin}
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      {/* 버튼 누르면 회원가입 + 로그인 진행 */}
      <CustomButton label="회원가입" onPress={handleSignupAndLogin} />
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
