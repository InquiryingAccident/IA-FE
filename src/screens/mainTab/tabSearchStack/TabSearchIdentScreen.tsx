import IdentInfoModal from '@/components/search/IdentInfoModal';
import {colors, tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {useFlightsStore} from '@/store/flightsStore';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH_IDENT
>;

function TabSearchIdentScreen({navigation}: TabSearchScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const modalStyles = modalStyling(theme);
  const flights = useFlightsStore(state => state.flights);
  const [identInfoModal, setIdentInfoModal] = useState<boolean>(false);
  console.log(JSON.stringify(flights));

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
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {flights[0].origin.city} - {flights[0].destination.city}
          </Text>
          <Text style={styles.subHeaderText}>
            {flights[0].origin.name} - {flights[0].destination.name}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={styles.identInfoModalController}
              onPress={() => setIdentInfoModal(true)}>
              <Text style={styles.identInfoModalControllerText}>
                {flights[0].ident}항공편 정보보기
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.headerGap} />

        <Text>{flights[0].ident}</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <IdentInfoModal
            visible={identInfoModal}
            onRequestClose={() => setIdentInfoModal(false)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default TabSearchIdentScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    identInfoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].BLACK,
    },
    headerContainer: {
      padding: 20,
      justifyContent: 'center',
      // alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
    },
    subHeaderText: {
      color: colors[theme].GRAY_700,
      fontSize: 16,
      marginBottom: 30,
    },
    identInfoModalController: {
      backgroundColor: colors[theme].BLUE_BASIC,
      width: Dimensions.get('screen').width - 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 20,
    },
    identInfoModalControllerText: {
      color: colors[theme].WHITE,
      fontSize: 15,
      fontWeight: '500',
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
      width: Dimensions.get('window').width,
      height: 10,
      backgroundColor: colors[theme].GRAY_200,
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

const modalStyling = (theme: ThemeMode) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: colors[theme].WHITE,

      borderRadius: 10,
      padding: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
