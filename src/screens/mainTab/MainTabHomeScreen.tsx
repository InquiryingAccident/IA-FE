import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type MainTabScreenProps = {};

function MainTabHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MainTabHomeScreen</Text>
    </View>
  );
}

export default MainTabHomeScreen;

const styles = StyleSheet.create({
  container: {},
  text: {},
});
