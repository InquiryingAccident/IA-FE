import React from 'react';
import {StyleSheet, TextInputProps} from 'react-native';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

function InputField() {}

export default InputField;

const styles = StyleSheet.create({});
