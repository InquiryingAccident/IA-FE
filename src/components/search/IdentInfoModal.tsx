import {colors} from '@/constants';
import {useFlightsStore} from '@/store/flightsStore';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

interface IdentInfoModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

function IdentInfoModal({visible, onRequestClose}: IdentInfoModalProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const noDataStyles = noDataStyling(theme);
  const flights = useFlightsStore(state => state.flights);
  const handleClose = () => {
    onRequestClose();
  };
  const calculateTime = (time: string) => {
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const day = time.slice(8, 10);
    const hour = time.slice(11, 13);
    const modifiedHour = Number(hour) + 9;
    const minute = time.slice(14, 16);
    // return `${year}년${month}월${day}일 ${modifiedHour}시:${minute}뷴`;
    return `${modifiedHour}시:${minute}뷴`;
  };

  if (flights?.length == 0) {
    return (
      <SafeAreaView style={noDataStyles.container}>
        <View style={noDataStyles.identInfoContainer}>
          <Text>항공편 정보가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  } else if (flights === null) {
    return (
      <SafeAreaView style={noDataStyles.container}>
        <View style={noDataStyles.identInfoContainer}>
          <Text>항공편 정보가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={handleClose}>
        <SafeAreaView style={[styles.optionBackground]}>
          <View style={styles.cardContainer}>
            <View style={styles.cardInner}>
              <View style={styles.cardHeaderContainer}>
                <View>
                  <Text style={styles.headerText}>
                    <Text style={styles.headerTextIdent}>
                      {flights[0].ident}
                    </Text>
                    항공편 정보
                  </Text>
                  <Text style={styles.subHeaderText}>
                    항공편의 상세 정보를 확인하세요.
                  </Text>
                </View>
                <View>
                  <Pressable onPress={handleClose}>
                    <Octicons
                      name="x"
                      size={24}
                      color={colors[theme].GRAY_700}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.gap} />
              <View style={styles.cardBodyContainer}>
                <View style={styles.bodyIdentTextContainer}>
                  <Text style={styles.bodyIdentTextQuestion}>출발지</Text>
                  <Text style={styles.bodyIdentOriginDestinationTextAnswer}>
                    {flights[0].origin.city}
                  </Text>
                </View>
                <View style={styles.bodyIdentTextContainer}>
                  <Text style={styles.bodyIdentTextQuestion}>도착지</Text>
                  <Text style={styles.bodyIdentOriginDestinationTextAnswer}>
                    {flights[0].destination.city}
                  </Text>
                </View>
                <View style={styles.bodyIdentTextContainer}>
                  <Text style={styles.bodyIdentTextQuestion}>
                    예상 출발 시간
                  </Text>
                  <Text style={styles.bodyIdentOriginDestinationTextAnswer}>
                    {calculateTime(flights[0].estimatedOut)}
                  </Text>
                </View>
                <View style={styles.bodyIdentTextContainer}>
                  <Text style={styles.bodyIdentTextQuestion}>
                    예상 도착 시간
                  </Text>
                  <Text style={styles.bodyIdentOriginDestinationTextAnswer}>
                    {calculateTime(flights[0].estimatedIn)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default IdentInfoModal;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      margin: 10,
      borderRadius: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.2,
      elevation: 1,
      borderColor: colors[theme].GRAY_500,
      borderWidth: 1.5,
    },
    cardInner: {
      padding: 20,
      width: '100%',
      // flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardHeaderContainer: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 20,
      color: colors[theme].BLUE_SHADOW,
      fontWeight: '500',
    },
    headerTextIdent: {
      fontSize: 24,
      color: colors[theme].BLUE_BASIC,
      fontWeight: '500',
    },
    subHeaderText: {
      color: colors[theme].BLACK,
      fontSize: 16,
    },
    gap: {
      marginHorizontal: 20,
      borderTopWidth: 1,
    },
    cardBodyContainer: {
      marginTop: 10,
      paddingHorizontal: 20,
    },
    bodyIdentTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginBottom: 10,
      paddingVertical: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: colors[theme].GRAY_200,
      // borderTopWidth: 1,
    },
    bodyIdentTextQuestion: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors[theme].GRAY_700,
    },
    bodyIdentOriginDestinationTextAnswer: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[theme].BLUE_BASIC,
    },
  });

const noDataStyling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    identInfoContainer: {
      backgroundColor: colors[theme].WHITE,
      width: Dimensions.get('screen').width - 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      elevation: 4,
      borderColor: colors[theme].GRAY_500,
      borderWidth: 1.5,
    },
  });
