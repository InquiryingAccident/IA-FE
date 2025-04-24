import InputField from '@/components/custom/InputField';
import UserEditHeaderRight from '@/components/user/UserEditHeaderRight';
import {colors, tabUserNavigations} from '@/constants';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {useUserStore} from '@/store/userStore';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';

type TabUserEditInfoScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER_EDIT_INFO
>;

function TabUserEditInfoScreen({navigation}: TabUserEditInfoScreenProps) {
  const {user, setUser} = useUserStore();

  const handlePressEditInfo = async () => {
    //저장 후 navigation goback기능 사용
    //서버 통신 후, zustand에 저장된 개인 정보 또한 수정 필요함
    navigation.goBack();
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => UserEditHeaderRight(handlePressEditInfo),
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nicknameContainer}>
        <Text style={styles.nicknameText}>닉네임 수정</Text>
        <InputField placeholder="닉네임을 입력해주세요." />
      </View>
    </SafeAreaView>
  );
}

export default TabUserEditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  nicknameContainer: {
    padding: 30,
    justifyContent: 'center',
  },
  nicknameText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY_700,
    marginBottom: -10,
    marginTop: 10,
  },
});
