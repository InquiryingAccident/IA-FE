import {tabUserNavigations} from '@/constants';
import TabUserHomeScreen from '@/screens/mainTab/tabUserStack/TabUserHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabUserStackParamList = {
  [tabUserNavigations.TAB_USER]: undefined;
};

const Stack = createStackNavigator<TabUserStackParamList>();

function TabUserStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={tabUserNavigations.TAB_USER}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name={tabUserNavigations.TAB_USER}
        component={TabUserHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default TabUserStackNavigator;
