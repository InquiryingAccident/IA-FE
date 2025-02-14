import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH
>;

function tabSearchHomeScreen({navigation}: TabSearchScreenProps) {
  return (
    <View>
      <Text>항공편 검색, 선택사항으로 날짜, 등 입력 모달 추가</Text>
    </View>
  );
}

export default tabSearchHomeScreen;
