import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import React, {PropsWithChildren} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

function Loader({
  children,
  size = 'small',
  color = colors.light.GRAY_500,
  ...props
}: PropsWithChildren<ActivityIndicatorProps>) {
  const {theme} = useThemeStore();
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.indicator}
        {...props}
      />
      {children}
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginBottom: 20,
  },
});
