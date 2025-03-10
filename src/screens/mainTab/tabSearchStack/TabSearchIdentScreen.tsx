import {tabSearchNavigations} from '@/constants';
import {TabSearchStackParamList} from '@/navigations/stack/TabSearchStackNavigator';
import {useFlightsStore} from '@/store/flightsStore';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

type TabSearchScreenProps = StackScreenProps<
  TabSearchStackParamList,
  typeof tabSearchNavigations.TAB_SEARCH_IDENT
>;

function TabSearchIdentScreen({navigation}: TabSearchScreenProps) {
  const flights = useFlightsStore(state => state.flights);
  if (flights?.length == 0) {
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
        {flights && flights.length > 0 && (
          <View style={styles.identInfoContainer}>
            <Text style={styles.identText}>{flights[0].ident}</Text>
            <Text>
              Origin{`\n`}
              <Text>
                {flights[0].origin.city}
                {`\n`}
              </Text>
              <Text>
                {flights[0].origin.name}
                {`\n`}
              </Text>
              <Text>{flights[0].origin.timezone}</Text>
            </Text>

            <Text>
              Destination{`\n`}
              <Text>
                {flights[0].destination.city}
                {`\n`}
              </Text>
              <Text>
                {flights[0].destination.name}
                {`\n`}
              </Text>
              <Text>{flights[0].destination.timezone}</Text>
            </Text>
          </View>
        )}
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
