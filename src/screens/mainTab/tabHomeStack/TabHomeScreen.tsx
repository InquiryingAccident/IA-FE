import {tabHomeNavigations} from '@/constants';
import {TabHomeStackParamList} from '@/navigations/stack/TabHomeStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';

type TabHomeScreenProps = StackScreenProps<
  TabHomeStackParamList,
  typeof tabHomeNavigations.TAB_HOME
>;

function TabHomeScreen({navigation}: TabHomeScreenProps) {
  // useEffect(() => {
  //   Alert.alert('알림', 'TabHomeScreen이 마운트 되었습니다.');
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>추가 기능& 항공 소식 알리기 등 기능 구현? 예정</Text>
    </SafeAreaView>
  );
}

export default TabHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
