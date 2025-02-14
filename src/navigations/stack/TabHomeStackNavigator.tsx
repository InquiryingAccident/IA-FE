import {tabHomeNavigations} from '@/constants';
import TabHomeScreen from '@/screens/mainTab/tabHomeStack/TabHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabHomeStackParamList = {
  [tabHomeNavigations.TAB_HOME]: undefined;
};

const Stack = createStackNavigator<TabHomeStackParamList>();

function TabHomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={tabHomeNavigations.TAB_HOME}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name={tabHomeNavigations.TAB_HOME}
        component={TabHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default TabHomeStackNavigator;
