import {tabBookmarkNavigations} from '@/constants';
import TabBookmarkHomeScreen from '@/screens/mainTab/tabBookmarkStack/TabBookmarkHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type TabBookmarkStackParamList = {
  [tabBookmarkNavigations.TAB_BOOKMARK]: undefined;
};

const Stack = createStackNavigator<TabBookmarkStackParamList>();

function TabBookmarkStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={tabBookmarkNavigations.TAB_BOOKMARK}
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}>
      <Stack.Screen
        name={tabBookmarkNavigations.TAB_BOOKMARK}
        component={TabBookmarkHomeScreen}
      />
    </Stack.Navigator>
  );
}

export default TabBookmarkStackNavigator;
