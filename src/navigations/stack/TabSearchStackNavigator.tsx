import {mainTabNavigations} from '@/constants';
import tabSearchHomeScreen from '@/screens/mainTab/tabSearchStack/TabSearchHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

function TabSearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={mainTabNavigations.MAINTAB_SEARCH}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name={mainTabNavigations.MAINTAB_SEARCH}
        component={tabSearchHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default TabSearchStackNavigator;
