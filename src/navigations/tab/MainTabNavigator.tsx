import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, mainTabNavigations} from '@/constants';
import TabSearchStackNavigator from '../stack/TabSearchStackNavigator';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import SvgIcon from '@/components/custom/CustomIcon';
import Logo from '@/assets/logo/LogoSvg.svg';
import TabUserStackNavigator from '../stack/TabUserStackNavigator';

export type MainTabParamList = {
  [mainTabNavigations.MAINTAB_SEARCH]: undefined;
  [mainTabNavigations.MAINTAB_USER]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={mainTabNavigations.MAINTAB_SEARCH}
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: Dimensions.get('screen').height * 0.08,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: colors.BLUE_BASIC,
        },
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case mainTabNavigations.MAINTAB_SEARCH:
              return (
                <SvgIcon
                  name="SearchIconWhite"
                  size={24}
                  color="#FFF"
                  opacity={focused ? 1 : 0.5}
                />
              );
            case mainTabNavigations.MAINTAB_USER:
              return (
                <SvgIcon
                  name="PersonFillWhite"
                  size={24}
                  opacity={focused ? 1 : 0.5}
                />
              );
            default:
              return null;
          }
        },
        tabBarLabel: ({focused}) => (
          <Text style={[styles.tabLabel, {opacity: focused ? 1 : 0.7}]}>
            {route.name === mainTabNavigations.MAINTAB_SEARCH
              ? '항공편 검색'
              : '내정보'}
          </Text>
        ),
        tabBarActiveTintColor: colors.WHITE,
        tabBarInactiveTintColor: colors.WHITE,
        headerLeft: () => (
          <View style={headerStyles.container}>
            <Logo width={30} height={30} />
            <Text style={headerStyles.headerText}>Plane Accident Finder</Text>
          </View>
        ),
        // headerTitle: () => (
        //   <View style={headerStyles.container}>
        //     <Logo width={30} height={30} />
        //     <Text>Plane Accident Finder</Text>
        //   </View>
        // ),
      })}>
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_SEARCH}
        component={TabSearchStackNavigator}
        options={{
          title: '',
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_USER}
        component={TabUserStackNavigator}
        options={{
          title: '',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    color: '#FFF',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: colors.BLUE_BASIC,
    fontSize: 16,
    textAlign: 'center',
  },
});
