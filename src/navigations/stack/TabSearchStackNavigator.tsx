import {mainTabNavigations, tabSearchNavigations} from '@/constants';
import tabSearchHomeScreen from '@/screens/mainTab/tabSearchStack/TabSearchHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabSearchStackParamList = {
  [tabSearchNavigations.TAB_SEARCH]: undefined;
};

const Stack = createStackNavigator<TabSearchStackParamList>();

function TabSearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={tabSearchNavigations.TAB_SEARCH}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH}
        component={tabSearchHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default TabSearchStackNavigator;
