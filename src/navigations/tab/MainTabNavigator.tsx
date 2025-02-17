import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTabNavigations} from '@/constants';
import TabSearchStackNavigator from '../stack/TabSearchStackNavigator';
import TabHomeStackNavigator from '../stack/TabHomeStackNavigator';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import SvgIcon from '@/components/custom/CustomIcon';
import TabBookmarkStackNavigator from '../stack/TabBookmarkStackNavigator';
import Logo from '@/assets/logo/LogoSvg.svg';
// import Logo from '@/assets/icons/LogoSvg.svg';

export type MainTabParamList = {
  [mainTabNavigations.MAINTAB_HOME]: undefined;
  [mainTabNavigations.MAINTAB_SEARCH]: undefined;
  [mainTabNavigations.MAINTAB_BOOKMARK]: undefined;
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
                <SvgIcon name="HomeActiveGreen" size={24} />
              ) : (
                <SvgIcon name="HomeInactive" size={24} />
              );
            case mainTabNavigations.MAINTAB_SEARCH:
              return focused ? (
                <SvgIcon name="SearchActiveGreen" size={24} />
              ) : (
                <SvgIcon name="SearchInactive" size={24} />
              );
            case mainTabNavigations.MAINTAB_BOOKMARK:
              return focused ? (
                <SvgIcon name="BookmarkActiveGreen" size={24} />
              ) : (
                <SvgIcon name="BookmarkInactive" size={24} />
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
          <View style={headerStyles.container}>
            <Logo width={30} height={30} />
            <Text>Accident Finder</Text>
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
        options={{
          title: '홈',
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_SEARCH}
        component={TabSearchStackNavigator}
        options={{
          title: '항공편 검색',
        }}
      />
      <Tab.Screen
        name={mainTabNavigations.MAINTAB_BOOKMARK}
        component={TabBookmarkStackNavigator}
        options={{
          title: '즐겨찾기',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
