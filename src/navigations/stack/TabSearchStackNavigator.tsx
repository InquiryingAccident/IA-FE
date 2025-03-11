import {mainTabNavigations, tabSearchNavigations} from '@/constants';
import TabSearchAccidentListScreen from '@/screens/mainTab/tabSearchStack/TabSearchAccidentListScreen';
import TabSearchHomeScreen, {
  Flight,
} from '@/screens/mainTab/tabSearchStack/TabSearchHomeScreen';
import TabSearchIdentScreen from '@/screens/mainTab/tabSearchStack/TabSearchIdentScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabSearchStackParamList = {
  [tabSearchNavigations.TAB_SEARCH]: undefined;
  [tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST]: {flights: Flight[]};
  [tabSearchNavigations.TAB_SEARCH_IDENT]: undefined;
};

const Stack = createStackNavigator<TabSearchStackParamList>();

function TabSearchStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={tabSearchNavigations.TAB_SEARCH}>
      <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH}
        component={TabSearchHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST}
        component={TabSearchAccidentListScreen}
        options={{
          headerTitle: '사고 내역',
        }}
      /> */}
      <Stack.Screen
        name={tabSearchNavigations.TAB_SEARCH_IDENT}
        component={TabSearchIdentScreen}
        options={{
          headerTitle: '항공편 정보',
          headerBackTitle: '뒤로',
          headerTitleStyle: {
            fontSize: 18,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default TabSearchStackNavigator;
