import {tabUserNavigations} from '@/constants';
import {TabUserStackParamList} from '@/navigations/stack/TabUserStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text} from 'react-native';

type TabUserScreenProps = StackScreenProps<
  TabUserStackParamList,
  typeof tabUserNavigations.TAB_USER
>;

function TabUserHomeScreen({navigation}: TabUserScreenProps) {
  return (
    <SafeAreaView>
      <Text>UserInfo</Text>
    </SafeAreaView>
  );
}

export default TabUserHomeScreen;
