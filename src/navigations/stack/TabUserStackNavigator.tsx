import {tabUserNavigations} from '@/constants';
import TabUserEditInfoScreen from '@/screens/mainTab/tabUserStack/TabUserEditInfoScreen';
import TabUserHomeScreen from '@/screens/mainTab/tabUserStack/TabUserHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabUserStackParamList = {
  [tabUserNavigations.TAB_USER]: undefined;
  [tabUserNavigations.TAB_USER_EDIT_INFO]: undefined;
};

const Stack = createStackNavigator<TabUserStackParamList>();

function TabUserStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={tabUserNavigations.TAB_USER}
      screenOptions={{
        headerTitle: '',
      }}>
      <Stack.Screen
        name={tabUserNavigations.TAB_USER}
        component={TabUserHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={tabUserNavigations.TAB_USER_EDIT_INFO}
        component={TabUserEditInfoScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default TabUserStackNavigator;
