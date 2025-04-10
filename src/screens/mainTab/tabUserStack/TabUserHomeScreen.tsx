import React from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SettingItem from '@/components/setting/SettingItem';
import {alerts, colors, tabUserNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {useUserStore} from '@/store/userStore';
import {StackScreenProps} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

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
    Alert.alert(
      alerts.LOGOUT_ACCOUNT.TITLE,
      alerts.LOGOUT_ACCOUNT.DESCRIPTION,
      [
        {
          text: '로그아웃',
          onPress: () =>
            logoutMutation.mutate(null, {
              onSuccess: () =>
                Toast.show({
                  type: 'success',
                  text1: '로그아웃 완료',
                  text2: '로그아웃 완료되었습니다.',
                  position: 'top',
                }),
              onError: error =>
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message || '로그아웃에 실패했습니다.',
                  position: 'top',
                }),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };
  const deleteUser = async () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteMutation.mutate(null, {
              onSuccess: () =>
                Toast.show({
                  type: 'success',
                  text1: '회원탈퇴 완료',
                  text2: '회원탈퇴가 완료되었습니다.',
                  position: 'top',
                }),
              onError: error =>
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message || '회원탈퇴에 실패했습니다.',
                  position: 'top',
                }),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
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
      <View style={styles.editContainer}>
        <Pressable
          style={styles.editMenu}
          onPress={() =>
            navigation.navigate(tabUserNavigations.TAB_USER_EDIT_INFO)
          }>
          <MaterialIcons name="edit" size={24} color={colors.BLUE_BASIC} />
          <Text style={styles.editText}>내 정보 수정</Text>
        </Pressable>
      </View>

      <View style={styles.containerGap} />

      <View style={styles.authContainer}>
        <SettingItem
          title="로그아웃"
          onPress={logoutUser}
          color={colors.GRAY_300}
          icon={
            <MaterialIcons name="logout" size={20} color={colors.GRAY_300} />
          }
        />
        <View
          style={{
            height: 2,
            backgroundColor: colors.GRAY_100,
          }}
        />
        <SettingItem
          title="회원탈퇴"
          onPress={deleteUser}
          color={colors.GRAY_300}
          icon={
            <Ionicons
              name="remove-circle-sharp"
              size={20}
              color={colors.RED_500}
            />
          }
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
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  editMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  editText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.GRAY_700,
  },
  containerGap: {
    width: '100%',
    height: 14,
    backgroundColor: colors.GRAY_100,
  },
  authContainer: {
    flex: 1,
  },
});
