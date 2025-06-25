import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import {KAKAO_REST_API_KEY, ServerBaseUrl} from '@env';
import axios from 'axios';
import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

const REDIRECT_URI = `${ServerBaseUrl}/api/auth/login`;

function KakaoLoginScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {loginMutation, signupMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: '', nickname: ''},
    validate: validateSignup,
  });
  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log('handleOnMessage');
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    console.log('Response.data = ', response.data);
    const kakaoAccessToken = response.data.access_token;
    const res = await axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`, // 카카오 토큰 api로 얻은 accesstoken 보내기
      },
      url: 'https://kapi.kakao.com/v2/user/me',
    });
    console.log('res = ', res.data);
    // const {email, password, nickname} = signup.values;
    const email = res.data.kakao_account.email;
    const nickname = res.data.kakao_account.profile.nickname;
    const password = '';
    console.log('email = ', email);
    console.log('nickname = ', nickname);

    signupMutation.mutate(
      {
        email,
        password,
        nickname,
      },
      {
        onError: error => {
          console.log('error = ', error);
          loginMutation.mutate(response.data.access_token, {
            onError: error => {
              console.log('error = ', error);
              Alert.alert(
                '로그인에 실패하였습니다.',
                '다시 시도하여 주시기 바랍니다.',
                [
                  {
                    text: '확인',
                    onPress: () => console.log('OK Pressed'),
                  },
                  {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
              );
            },
          });
          // setIsLoading(false);
        },
      },
    );
  };

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={'large'} color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

export default KakaoLoginScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get('window').height,
      paddingBottom: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
