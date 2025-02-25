import {tabBookmarkNavigations} from '@/constants';
import {TabBookmarkStackParamList} from '@/navigations/stack/TabBookmarkStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

type TabBookmarkScreenProps = StackScreenProps<
  TabBookmarkStackParamList,
  typeof tabBookmarkNavigations.TAB_BOOKMARK
>;

function TabBookmarkHomeScreen({navigation}: TabBookmarkScreenProps) {
  return (
    <SafeAreaView>
      <Text>즐겨찾기</Text>
    </SafeAreaView>
  );
}

export default TabBookmarkHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
