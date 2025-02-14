import {tabHomeNavigations} from '@/constants';
import {TabHomeStackParamList} from '@/navigations/stack/TabHomeStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

type TabHomeScreenProps = StackScreenProps<
  TabHomeStackParamList,
  typeof tabHomeNavigations.TAB_HOME
>;

function TabHomeScreen({navigation}: TabHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>TabHomeScreen</Text>
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
