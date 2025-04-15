import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import CustomButton from '@/components/custom/CustomButton';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations, colors} from '@/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import useAuth from '@/hooks/queries/useAuth';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthScreenProps) => {
  const {signupMutation, loginMutation} = useAuth();
  const handlePressAppleLogin = async () => {
    try {
      // const {identityToken, fullName} = await appleAuth.performRequest({
      //   requestedOperation: appleAuth.Operation.LOGIN,
      //   requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      // });

      // if (identityToken) {
      //   loginMutation.mutate({
      //     email: fullName.
      //     appId: 'org.reactjs.native.example.MatzipApp',
      //     nickname: fullName?.givenName ?? null,
      //   });
      // }
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        signupMutation.mutate(
          {
            email: appleAuthRequestResponse.email || '',
            password: '',
            nickname: appleAuthRequestResponse.user || '',
          },
          {
            onError: error => {
              loginMutation.mutate(
                {
                  email: appleAuthRequestResponse.email || '',
                  password: '',
                },
                {
                  onError: error => {
                    Toast.show({
                      type: 'error',
                      text1: '애플 로그인에 실패했습니다.',
                      text2: '다시 시도해주세요.',
                    });
                  },
                },
              );
            },
          },
        );
      }
    } catch (error: any) {
      if (error.code !== appleAuth.Error.CANCELED) {
        Toast.show({
          type: 'error',
          text1: '애플 로그인에 실패했습니다.',
          text2: '다시 시도해주세요.',
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/logo/Logo.png')}
          style={styles.image}
        />
        {/* <MaterialIcons
          name="flight"
          size={Dimensions.get('screen').width * 0.8}
          color="black"
        /> */}
        <Text style={styles.appName}>Plane Accident Finder</Text>
        <Text style={styles.subText}>
          여행 전, 탑승하는 항공기의 사고이력을 조회해 보세요!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: Dimensions.get('screen').width - 60,
              height: 50,
            }}
            cornerRadius={3}
            onPress={handlePressAppleLogin}
          />
        )}
        <CustomButton
          label="카카오 로그인하기"
          onPress={() => navigation.navigate(authNavigations.AUTH_KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={
            <Ionicons name="chatbubble-sharp" color={'#181500'} size={16} />
          }
        />
        <CustomButton
          label="로그인"
          variant="filled"
          onPress={() => navigation.navigate(authNavigations.AUTH_LOGIN)}
        />
        <CustomButton
          label="회원가입"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.AUTH_SIGNUP)}
        />
      </View>
      <MaterialIcons name="flight-takeoff" size={24} color="black" />
    </SafeAreaView>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').width * 0.8,
  },
  appName: {
    padding: 30,
    fontSize: 24,
    marginTop: 8,
    fontWeight: '500',
    color: colors.BLUE_BASIC,
    // fontStyle: 'italic',
  },
  subText: {
    color: colors.GRAY_400,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    bottom: 100,
    position: 'absolute',
  },
  kakaoButtonContainer: {
    backgroundColor: '#fee503',
  },
  kakaoButtonText: {
    color: '#181600',
  },
});
