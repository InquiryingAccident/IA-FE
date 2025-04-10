import {tabUserNavigations} from '@/constants';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TabUserEditInfoScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER_EDIT_INFO
>;

function TabUserEditInfoScreen({navigation}: TabUserEditInfoScreenProps) {
  return (
    <View style={styles.container}>
      <Text>TabUserEditInfoScreen</Text>
    </View>
  );
}

export default TabUserEditInfoScreen;

const styles = StyleSheet.create({
  container: {},
});
