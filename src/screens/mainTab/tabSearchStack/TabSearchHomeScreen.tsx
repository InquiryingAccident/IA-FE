// import {tabSearchNavigations} from '@/constants';
// import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
// import {StackScreenProps} from '@react-navigation/stack';
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   Pressable,
//   Alert,
// } from 'react-native';
// import InputField from '@/components/custom/NoBoxInputField';
// import SvgIcon from '@/components/custom/CustomIcon';

// type TabSearchScreenProps = StackScreenProps<
//   TabSearchStackParamList,
//   typeof tabSearchNavigations.TAB_SEARCH
// >;

// function tabSearchHomeScreen({navigation}: TabSearchScreenProps) {
//   const [searchText, setSearchText] = useState('');
//   const accidentData = {
//     registration: 'HL8088',
//   };
//   const handleSearch = () => {
//     Alert.alert('항공편 검색 기능은 준비 중입니다.');
//     navigation.navigate(tabSearchNavigations, {accidentData});
//   };

//   // const handleSearch = async () => {
//   //   if (!searchText) {
//   //     Alert.alert('항공편 코드를 입력해주세요');
//   //     return;
//   //   }
//   //   try {
//   //     // 1. FlightAware API를 통해 해당 항공편의 tailNumber를 조회
//   //     // (아래 URL은 예시이므로 실제 API 엔드포인트와 인증정보를 적용해야 합니다.)
//   //     const flightResponse = await fetch(
//   //       `https://api.flightaware.com/flight?code=${searchText}`,
//   //     );
//   //     const flightData = await flightResponse.json();
//   //     const tailNumber = flightData.tailNumber;

//   //     if (!tailNumber) {
//   //       Alert.alert('해당 항공편의 tail number를 찾을 수 없습니다.');
//   //       return;
//   //     }

//   //     // 2. tailNumber를 이용해 자체 서버 API를 통해 사고 내역 조회
//   //     // (아래 URL도 예시입니다. 실제 API 주소와 파라미터에 맞게 수정하세요.)
//   //     const accidentResponse = await fetch(
//   //       `https://yourserver.com/api/accidents?tailNumber=${tailNumber}`,
//   //     );
//   //     const accidentData = await accidentResponse.json();

//   //     // 3. 사고 내역 화면(TabSearchAccidentListScreen)으로 네비게이트
//   //     navigation.navigate('TabSearchAccidentList', {accidentData});
//   //   } catch (error) {
//   //     console.error(error);
//   //     Alert.alert('검색 중 오류가 발생했습니다.');
//   //   }
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>항공편 검색, 선택사항으로 날짜, 등 입력 모달 추가</Text>
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputField}>
//           <InputField
//             label="항공편 검색"
//             placeholder="항공편 코드(Ex: KE123)"
//             value={searchText}
//             onChangeText={value => setSearchText(value)}
//           />
//         </View>
//         <Pressable style={styles.searchIcon} onPress={() => handleSearch()}>
//           <SvgIcon name="SearchInactive" size={32} />
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default tabSearchHomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchInputField: {
//     width: '70%',
//   },
//   searchIcon: {
//     width: '20%',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'black',
//   },
// });
import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import InputField from '@/components/custom/NoBoxInputField';
import SvgIcon from '@/components/custom/CustomIcon';
import axiosFlightAwareInstance from '@/api/axiosFlightaware';
import {FlightAwareApi, xapikey} from '@env';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH
>;

function tabSearchHomeScreen({navigation}: TabSearchScreenProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('항공편 코드를 입력해주세요');
      return;
    }
    try {
      Alert.alert(`${FlightAwareApi}/flight/${searchText}`);
      const response = await axiosFlightAwareInstance.get(
        `/flight/${searchText}`,
        {
          headers: {
            'x-apikey': xapikey,
          },
        },
      );
      if (response.status !== 200) {
        Alert.alert('해당 항공편의 tail number를 찾을 수 없습니다.');
        return;
      } else {
        Alert.alert('해당 항공편의 tail number를 찾았습니다.');
      }
      const tailNumber = 'HL8088';
      const accidentDate = '2021-01-01';
      navigation.navigate(tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST, {
        tailNumber,
        accidentDate,
      });
    } catch (error) {
      console.error(error);
      Alert.alert('검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputField}>
          <InputField
            label="항공편 검색"
            placeholder="항공편 코드(Ex: KE123)"
            value={searchText}
            onChangeText={value => setSearchText(value)}
          />
        </View>
        <Pressable style={styles.searchIcon} onPress={handleSearch}>
          <SvgIcon name="SearchInactive" size={32} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default tabSearchHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  searchInputField: {
    flex: 1,
    marginRight: 8,
  },
  searchIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
});
