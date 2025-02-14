import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigations/root/RootNavigator';
import {AuthProvider} from '@/utils/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
