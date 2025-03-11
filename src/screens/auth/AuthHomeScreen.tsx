import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CustomButton from '@/components/custom/CustomButton';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AuthScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthScreenProps) => {
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
        <Text style={styles.appName}>항공 사고기록 검색기</Text>
      </View>
      <View style={styles.buttonContainer}>
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
    // fontStyle: 'italic',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    bottom: 100,
    position: 'absolute',
  },
});
