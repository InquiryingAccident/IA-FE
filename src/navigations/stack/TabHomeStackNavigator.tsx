import {mainTabNavigations} from '@/constants';
import TabHomeScreen from '@/screens/mainTab/tabHomeStack/tabHomeScreen';
import tabSearchHomeScreen from '@/screens/mainTab/tabSearchStack/TabSearchHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

function TabHomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mainTabNavigations.MAINTAB_HOME}
        component={TabHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default TabHomeStackNavigator;
