import queryClient from '@/api/queryClient';
import {colors} from '@/constants';
import RootNavigator from '@/navigations/root/RootNavigator';
import {AuthProvider} from '@/utils/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.BLUE_BASIC}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App(): React.JSX.Element {
  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}

export default App;
