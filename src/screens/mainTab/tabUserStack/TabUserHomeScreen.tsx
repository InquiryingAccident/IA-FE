import SettingItem from '@/components/setting/SettingItem';
import {colors, tabUserNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {useUserStore} from '@/store/userStore';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

type TabUserScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER
>;

type CalculatedDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
};

function TabUserHomeScreen({navigation}: TabUserScreenProps) {
  const {logoutMutation} = useAuth();
  const userInfo = useUserStore(state => state.user);
  let accountStatusString;
  let accountCreatedDate;
  let accountLastLoginTime;
  function formatDateTime(isoString: string) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  }

  if (userInfo?.accountStatus === 'ACTIVE') {
    accountStatusString = '활성됨';
  } else {
    accountStatusString = '비활성됨';
  }
  if (userInfo?.createDate) {
    accountCreatedDate = formatDateTime(userInfo.createDate);
  }
  if (userInfo?.lastLoginTime) {
    accountLastLoginTime = formatDateTime(userInfo.lastLoginTime);
  }
  const logoutUser = async () => {};

  const deleteUser = async () => {
    console.log('delte Token: Logout or DeleteUser');
    await logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {userInfo ? (
        <View style={styles.userInfo}>
          <Text>사용자 닉네임: {userInfo.nickname}</Text>
          <Text>사용자 이메일: {userInfo.email}</Text>
          <Text>사용자 계정 상태: {accountStatusString}</Text>
          <Text>사용자 계정 생성일: {accountCreatedDate}</Text>
          <Text>사용자 계정 마지막 로그인 시간: {accountLastLoginTime}</Text>
        </View>
      ) : (
        <View>
          <Text>사용자 정보를 표시할 수 없습니다.{`\n`}</Text>
        </View>
      )}

      <View style={styles.authContainer}>
        <SettingItem
          title="로그아웃"
          onPress={deleteUser}
          color={colors.RED_500}
        />
        <SettingItem
          title="회원탈퇴"
          onPress={deleteUser}
          color={colors.RED_500}
        />
      </View>
    </SafeAreaView>
  );
}

export default TabUserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    flex: 1,
  },
});
