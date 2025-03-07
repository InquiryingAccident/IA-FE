import React, {useState} from 'react';
import {colors, storageKeys, tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {View, SafeAreaView, StyleSheet, Alert, Text} from 'react-native';
import SearchIdentInputField from '@/components/custom/SearchIdentInputField';
import axiosInstance from '@/api/axios';
import {getEncryptStorage} from '@/utils';

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

function TabSearchHomeScreen({navigation}: TabSearchScreenProps) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('항공편 코드를 입력해주세요');
      return;
    }
    try {
      const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);
      const formData = new FormData();
      formData.append('flightNumber', searchText);
      const response = await axiosInstance.post(
        '/api/plane/registration/search',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        const data = await response.data;
        if (data.flights.length == 0) {
          Alert.alert('항공편의 정보가 없습니다.', '다시 시도해주세요.');
        } else {
          Alert.alert('항공편을 찾았습니다.');
          console.log(data);
        }
      }
    } catch (error) {
      console.error('항공편 검색 에러');
      console.error(error);
    }
  };

  return (
    <View
      style={{backgroundColor: colors.WHITE, width: '100%', height: '100%'}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>항공편을 검색하세요</Text>
          <Text style={styles.subHeaderText}>
            해당 항공편의 정보와 사고기록을 보여줍니다.
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <SearchIdentInputField
            placeholder="항공편 코드(ex: KE123)"
            value={searchText}
            onChangeText={value => setSearchText(value)}
            onPress={handleSearch}
            onSubmitEditing={handleSearch}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default TabSearchHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    gap: 5,
  },
  headerText: {
    fontSize: 24,
    color: colors.BLUE_BASIC,
  },
  subHeaderText: {
    color: colors.BLACK,
    fontSize: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
});
