import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH_IDENT
>;

function TabSearchIdentScreen({navigation}: TabSearchScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.identInfo}>
        <Text>
          항공편 스크린, 출발지 - 목적지, 그 아래에 출발시간-예상도착시간 등의
          정보 입력
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default TabSearchIdentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  identInfo: {
    flex: 1,
  },
});
