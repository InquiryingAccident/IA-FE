import SettingItem from '@/components/setting/SettingItem';
import {colors, tabUserNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {useUserStore} from '@/store/userStore';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  const {logoutMutation, deleteMutation} = useAuth();
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

    return `${year}. ${month}. ${day}일`; // ${hours}시 ${minutes}분 ${seconds}초`;
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
  const logoutUser = async () => {
    logoutMutation.mutate(null);
  };
  const deleteUser = async () => {
    deleteMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {userInfo ? (
        <View style={styles.userInfo}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoHeaderText}>내정보</Text>
            <View style={styles.infoHeaderGap}></View>
            <Pressable
              style={styles.accountStatusButton}
              onPress={() => console.log('계정 활성화 버튼 클릭')}>
              <Text style={styles.accountStatusText}>계정 활성화</Text>
            </Pressable>
          </View>
          <Text style={styles.questionHeaderText}>
            닉네임{'     '}
            <Text style={styles.answerNickname}>{userInfo.nickname}</Text>
          </Text>
          <Text style={styles.questionHeaderText}>
            아이디{'     '}
            <Text style={styles.answerNickname}>{userInfo.email}</Text>
          </Text>
          <Text style={styles.questionHeaderText}>
            계정 생성일{'     '}
            <Text style={styles.answerNickname}>{accountCreatedDate}</Text>
          </Text>
          <Text style={styles.questionHeaderText}>
            마지막 로그인{'     '}
            <Text style={styles.answerNickname}>{accountLastLoginTime}</Text>
          </Text>
        </View>
      ) : (
        <View>
          <Text>사용자 정보를 표시할 수 없습니다.{`\n`}</Text>
        </View>
      )}
      <View style={styles.containerGap}></View>

      <View style={styles.authContainer}>
        <SettingItem
          title="로그아웃"
          onPress={logoutUser}
          color={colors.GRAY_300}
        />
        <View
          style={{
            height: 2,
            backgroundColor: colors.GRAY_100,
          }}></View>
        <SettingItem
          title="회원탈퇴"
          onPress={deleteUser}
          color={colors.GRAY_300}
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
    backgroundColor: colors.WHITE,
  },
  userInfo: {
    // padding: 20,
    paddingVertical: 30,
    paddingHorizontal: 22,
  },
  infoHeader: {
    flexDirection: 'row',
    marginTop: 10,
    // backgroundColor: colors.RED_300,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoHeaderText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 18,
    color: colors.GRAY_300,
  },
  infoHeaderGap: {
    width: Dimensions.get('screen').width * 0.5,
  },
  accountStatusButton: {
    width: 76,
    height: 26,
    alignSelf: 'flex-end',
    borderRadius: 4,
    backgroundColor: colors.BLUE_BASIC,
    justifyContent: 'center',
  },
  accountStatusText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.WHITE,
  },
  questionHeaderText: {
    fontSize: 14,
    color: colors.GRAY_300,
    marginBottom: 20,
  },
  answerNickname: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.BLACK,
  },
  authContainer: {
    flex: 1,
  },
  containerGap: {
    width: '100%',
    height: 14,
    backgroundColor: colors.GRAY_100,
  },
});
