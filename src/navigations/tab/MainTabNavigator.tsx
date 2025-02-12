import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTabNavigations} from '@/constants';
import MainTabHomeScreen from '@/screens/mainTab/MainTabHomeScreen';
import TabSearchStackNavigator from '../stack/TabSearchStackNavigator';
import TabHomeStackNavigator from '../stack/TabHomeStackNavigator';
import {View, TouchableOpacity} from 'react-native';
// import Logo from '@/assets/icons/LogoSvg.svg';

export type MainTabParamList = {
  [mainTabNavigations.MAINTAB_HOME]: undefined;
  [mainTabNavigations.MAINTAB_SEARCH]: undefined;
  [mainTabNavigations.MAINTAB_ADD]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={mainTabNavigations.MAINTAB_HOME}
      screenOptions={({route}) => ({
        tabBarStyle: {
          shadowColor: 'transparent',
          backgroundColor: '#FFF',
        },
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case mainTabNavigations.MAINTAB_HOME:
              return focused ? (
                <HomeIconActive width={24} height={24} />
              ) : (
                <HomeIconInactive width={24} height={24} />
              );
            case mainTabNavigations.MAINTAB_SEARCH:
              return focused ? (
                <SearchIconActive width={24} height={24} />
              ) : (
                <SearchIconInactive width={24} height={24} />
              );
            case mainTabNavigations.MAINTAB_ADD:
              return focused ? (
                <StarIconActive width={24} height={24} />
              ) : (
                <StarIconInactive width={24} height={24} />
              );
            default:
              return null;
          }
        },
        tabBarActiveTintColor: '#98CE40', // 활성화된 탭 색상
        tabBarInactiveTintColor: '#828282', // 비활성화된 탭 색상
        headerTitleAlign: 'center', // 헤더 타이틀 가운데 정렬
        headerStyle: {
          // justifyContent: 'center',
          backgroundColor: '#FFF',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitle: () => (
          //로고 transformer 수정 필요
          <View>
            <Logo
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        ),
        //headerRight -> DrawerNavigator 구현예정
        // headerRight: () => (
        //   <TouchableOpacity
        //     style={{marginRight: 32}}
        //     onPress={() => {
        //       console.log('다이아몬드 아이콘 클릭');
        //       navigation.navigate(mainNavigations.MAIN_PURCHASE);
        //       // 결제 화면 이동 로직 추가
        //     }}>
        //     <PurchaseLogo />
        //   </TouchableOpacity>
        // ),
      })}>
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_HOME}
        component={TabHomeStackNavigator}
      />
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_SEARCH}
        component={TabSearchStackNavigator}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
