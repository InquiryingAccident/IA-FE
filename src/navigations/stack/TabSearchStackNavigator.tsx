import {mainTabNavigations, tabSearchNavigations} from '@/constants';
import TabSearchAccidentListScreen from '@/screens/mainTab/tabSearchStack/TabSearchAccidentListScreen';
import tabSearchHomeScreen from '@/screens/mainTab/tabSearchStack/TabSearchHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabSearchStackParamList = {
  [tabSearchNavigations.TAB_SEARCH]: undefined;
  [tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST]: {
    tailNumber: string;
  };
};

const Stack = createStackNavigator<TabSearchStackParamList>();

function TabSearchStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={tabSearchNavigations.TAB_SEARCH}>
      <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH}
        component={tabSearchHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST}
        component={TabSearchAccidentListScreen}
        options={{
          headerTitle: '사고 내역',
        }}
      />
    </Stack.Navigator>
  );
}

export default TabSearchStackNavigator;
