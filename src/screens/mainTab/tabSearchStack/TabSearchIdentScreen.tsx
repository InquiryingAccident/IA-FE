import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {useFlightsStore} from '@/store/flightsStore';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH_IDENT
>;

function TabSearchIdentScreen({navigation}: TabSearchScreenProps) {
  const flights = useFlightsStore(state => state.flights);

  const calculateTime = (time: string) => {
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const day = time.slice(8, 10);
    const hour = time.slice(11, 13);
    const minute = time.slice(14, 16);
    return `${year}년${month}월${day}일 ${hour}시:${minute}뷴`;
  };

  //   const date = new Date(time);
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   return `${hours}:${minutes}`;
  // };
  if (flights?.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.identInfoContainer}>
          <Text>항공편 정보가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  } else if (flights === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.identInfoContainer}>
          <Text>항공편 정보가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      // <SafeAreaView style={styles.container}>
      //   {flights && flights.length > 0 && (
      //     <View style={styles.identInfoContainer}>
      //       <Text style={styles.identText}>항공편 {flights[0].ident}</Text>
      //       <View style={styles.headerInfoContainer}>
      //         <View style={styles.headerDeparture}>
      //           <Text style={styles.headerDepartureText}>
      //             출발{`\n`}
      //             <Text style={styles.headerDepartureInfoText}>
      //               {flights[0].origin.city}
      //               {`\n`}
      //             </Text>
      //           </Text>
      //         </View>
      //         <View style={styles.headerGap}>
      //           <Ionicons name="airplane-outline" size={48} color="black" />
      //         </View>
      //         <View style={styles.headerArrival}>
      //           <Text style={styles.headerArrivalText}>
      //             도착{`\n`}
      //             <Text style={styles.headerArrivalInfoText}>
      //               {flights[0].destination.city}
      //               {`\n`}
      //             </Text>
      //             <Text style={styles.headerArrivalInfoText}>
      //               {`\n`}예상 도착 시간: {`\n`}
      //               {flights[0].actualIn}
      //               {`\n`}
      //               {calculateTime(flights[0].actualIn)}
      //             </Text>
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   )}
      // </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <Text>{flights[0].ident}</Text>
      </SafeAreaView>
    );
  }
}

export default TabSearchIdentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  identInfoContainer: {
    gap: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  identText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  headerInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerDeparture: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  headerGap: {
    width: Dimensions.get('screen').width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerArrival: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  headerDepartureText: {
    textAlign: 'center',
    fontSize: 32,
  },
  headerArrivalText: {
    textAlign: 'center',
    fontSize: 32,
  },
  headerDepartureInfoText: {
    textAlign: 'center',
    fontSize: 20,
  },
  headerArrivalInfoText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
