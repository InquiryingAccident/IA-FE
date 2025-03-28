import {colors, tabSearchNavigations} from '@/constants';
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
          headerTitle: '',
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
          headerBackButtonDisplayMode: 'minimal',
          headerTitle: '항공편 정보',
          // headerBackTitle: '뒤로',
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.BLACK,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default TabSearchStackNavigator;
