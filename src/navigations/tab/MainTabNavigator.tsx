import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTabNavigations} from '@/constants';
import MainTabHomeScreen from '@/screens/mainTab/MainTabHomeScreen';

export type MainTabParamList = {
  [mainTabNavigations.MAINTAB_HOME]: undefined;
  [mainTabNavigations.MAINTAB_SEARCH]: undefined;
  [mainTabNavigations.MAINTAB_ADD]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_HOME}
        component={MainTabHomeScreen}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
