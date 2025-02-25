import {getAccessToken} from '@/api/auth';
import SettingItem from '@/components/setting/SettingItem';
import {colors, storageKeys, tabUserNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {removeEncryptStorage} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

type TabUserScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER
>;

function TabUserHomeScreen({navigation}: TabUserScreenProps) {
  const {logoutMutation} = useAuth();

  const deleteUser = async () => {
    console.log('유저 정보 삭제 - 로그아웃/회원탈퇴');
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingItem
        title={'로그아웃'}
        onPress={deleteUser}
        color={colors.RED_300}
      />
      <SettingItem
        title={'회원탈퇴'}
        onPress={deleteUser}
        color={colors.RED_300}
      />
    </SafeAreaView>
  );
}

export default TabUserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
