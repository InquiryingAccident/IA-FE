import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Pressable, Alert} from 'react-native';
import InputField from '@/components/custom/NoBoxInputField';
import SvgIcon from '@/components/custom/CustomIcon';
import axiosFlightAwareInstance from '@/api/axiosFlightaware';
import {xapikey} from '@env';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH
>;

export interface Flight {
  ident: string;
  registration: string | null;
  scheduled_out?: string;
  scheduled_in?: string;
  estimated_out?: string;
  estimated_in?: string;
  actual_out?: string | null;
  actual_in?: string | null;
  departure_delay?: number;
  arrival_delay?: number;
  status?: string;
  aircraft_type?: string;
  [key: string]: any;
}

function tabSearchHomeScreen({navigation}: TabSearchScreenProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('항공편 코드를 입력해주세요');
      return;
    }
    try {
      // Alert.alert(`${FlightAwareApi}/flight/${searchText}`);
      const response = await axiosFlightAwareInstance.get(
        `/flights/${searchText}`,
        {
          headers: {
            'x-apikey': xapikey,
          },
        },
      );
      // if (response.status !== 200) {
      //   Alert.alert('해당 항공편의 tail number를 찾을 수 없습니다.');
      //   return;
      // } else {
      //   Alert.alert('해당 항공편의 tail number를 찾았습니다.');
      // }
      const flights: Flight[] = response.data.flights;
      if (!flights || flights.length === 0) {
        Alert.alert('항공편의 비행기가 없습니다.');
        return;
      }
      const validFlights = flights.filter(
        (flight: Flight) => flight.registration !== null,
      );
      if (validFlights.length > 0) {
        navigation.navigate(tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST, {
          flights: validFlights,
        });
      } else {
        Alert.alert('유효한 항공 번호가 없습니다.');
      }
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
