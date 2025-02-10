import RootNavigator from '@/navigations/root/RootNavigator';
import {AuthProvider} from '@/utils/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
