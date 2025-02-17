// import React, {useRef} from 'react';
// import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
// import {StackScreenProps} from '@react-navigation/stack';
// import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
// import {authNavigations} from '@/constants';
// import useForm from '@/hooks/useForm';
// import {validateLogin} from '@/utils';
// import CustomButton from '@/components/custom/CustomButton';
// import InputField from '@/components/custom/InputField';
// import useAuth from '@/hooks/queries/useAuth';

// type AuthScreenProps = StackScreenProps<
//   AuthStackParamList,
//   typeof authNavigations.AUTH_LOGIN
// >;

// function AuthLoginScreen({navigation}: AuthScreenProps) {
//   const {isLogin} = useAuth();
//   const passwordRef = useRef<TextInput | null>(null);
//   const login = useForm({
//     initialValue: {email: '', password: ''},
//     validate: validateLogin,
//   });

//   const handleSubmit = () => {
//     console.log('login.values', login.values);
//     // loginMutation.mutate(login.values);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inputContainer}>
//         <InputField
//           autoFocus
//           placeholder="이메일"
//           error={login.errors.email}
//           touched={login.touched.email}
//           inputMode="email"
//           returnKeyType="next"
//           blurOnSubmit={false}
//           onSubmitEditing={() => passwordRef.current?.focus()}
//           {...login.getTextInputProps('email')}
//         />
//         <InputField
//           ref={passwordRef}
//           placeholder="비밀번호"
//           error={login.errors.password}
//           touched={login.touched.password}
//           secureTextEntry
//           returnKeyType="join"
//           onSubmitEditing={handleSubmit}
//           {...login.getTextInputProps('password')}
//         />
//       </View>
//       <CustomButton
//         label="로그인"
//         variant="filled"
//         size="large"
//         onPress={handleSubmit}
//       />
//     </SafeAreaView>
//   );
// }

// export default AuthLoginScreen;

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
import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Alert, TextInput} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations, storageKeys} from '@/constants';
import CustomButton from '@/components/custom/CustomButton';
import InputField from '@/components/custom/InputField';
import axiosInstance from '@/api/axios';
import {setEncryptStorage, useAuth} from '@/utils';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_LOGIN
>;

function AuthLoginScreen({navigation}: AuthScreenProps) {
  const {setIsLogin} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [touched, setTouched] = useState<{email: boolean; password: boolean}>({
    email: false,
    password: false,
  });

  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = async () => {
    let valid = true;
    const newErrors: {email?: string; password?: string} = {};

    if (!email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
      valid = false;
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        console.log('login values:', {email, password});
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axiosInstance.post('/api/auth/login', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          Alert.alert('로그인 성공');
          const data = await response.data;
          await setEncryptStorage(storageKeys.ACCESS_TOKEN, data.accessToken);
          await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
          setIsLogin(true);
        } else {
          Alert.alert('로그인 실패');
        }
      } catch (error) {
        Alert.alert('로그인 실패');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={errors.email}
          touched={touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setTouched(prev => ({...prev, email: true}));
          }}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={errors.password}
          touched={touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setTouched(prev => ({...prev, password: true}));
          }}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
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
  },
});
