import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
}: CustomButtonProps) {
  return (
    <Pressable>
      <Text>{label}</Text>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {},
});
