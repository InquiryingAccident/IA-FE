import SettingItem from '@/components/setting/SettingItem';
import {colors, tabUserNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

type TabUserScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER
>;

function TabUserHomeScreen({navigation}: TabUserScreenProps) {
  const {logoutMutation} = useAuth();

  const deleteUser = async () => {
    console.log('delte Token: Logout or DeleteUser');
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingItem
        title="로그아웃"
        onPress={deleteUser}
        color={colors.RED_500}
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
