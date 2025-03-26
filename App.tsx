import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigations/root/RootNavigator';
import {AuthProvider} from '@/utils/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}

export default App;
