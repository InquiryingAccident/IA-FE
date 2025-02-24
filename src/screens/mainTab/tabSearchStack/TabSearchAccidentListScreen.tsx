// // TabSearchAccidentListScreen.tsx
// import React from 'react';
// import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
// import {StackScreenProps} from '@react-navigation/stack';
// import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
// import {tabSearchNavigations} from '@/constants';

// type Accident = {
//   date: string;
//   description: string;
// };

// type TabSearchAccidentListScreenProps = StackScreenProps<
//   TabSearchStackParamList,
//   typeof tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST
// >;

// const TabSearchAccidentListScreen: React.FC<
//   TabSearchAccidentListScreenProps
// > = ({route}) => {
//   const {accidentData} = route.params as {accidentData: Accident[]};

//   return (
//     <SafeAreaView style={styles.container}>
//       {accidentData.length === 0 ? (
//         <Text style={styles.noDataText}>사고 내역이 없습니다</Text>
//       ) : (
//         <FlatList
//           data={accidentData}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item}) => (
//             <View style={styles.itemContainer}>
//               <Text style={styles.itemDate}>{item.date}</Text>
//               <Text style={styles.itemDescription}>{item.description}</Text>
//             </View>
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default TabSearchAccidentListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   noDataText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
//   itemContainer: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   itemDate: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   itemDescription: {
//     fontSize: 14,
//     marginTop: 4,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {storageKeys, tabSearchNavigations} from '@/constants';
import axiosInstance from '@/api/axios';
import {getEncryptStorage} from '@/utils';
import {Flight} from './TabSearchHomeScreen';

type Accident = {
  date: string;
  description: string;
};

type TabSearchAccidentListScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH_ACCIDENTLIST
>;

const TabSearchAccidentListScreen: React.FC<
  TabSearchAccidentListScreenProps
> = ({route}) => {
  // 필수: tailNumber, 선택: accidentDate
  const {flights} = route.params;

  const [accidentData, setAccidentData] = useState<Accident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Alert.alert('항공기번호', tailNumber);
    const fetchAccidents = async () => {
      try {
        const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);
        // Alert.alert(accessToken);
        const accidentListformData = new FormData();
        // accidentListformData.append('registration', tailNumber);
        // accidentListformData.append('page', 0);
        // accidentListformData.append('size', 10);
        // accidentListformData.append('sortField', 'accidentDate');
        // accidentListformData.append('sortDirection', 'ASC');
        const response = await axiosInstance.post(
          '/api/plane-accident/registration/search',
          accidentListformData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setAccidentData(response.data);
      } catch (err) {
        console.error(err);
        setError('사고 내역 조회 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccidents();
    if (accidentData.length === 0) {
      Alert.alert('해당 비행기는 사고내역이 없습니다.');
    }
  }, [flights]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {accidentData.length === 0 ? (
        <Text style={styles.noDataText}>사고 내역이 없습니다</Text>
      ) : (
        <FlatList
          data={accidentData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default TabSearchAccidentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemDate: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
