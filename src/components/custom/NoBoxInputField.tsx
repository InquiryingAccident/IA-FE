import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {colors} from '@/constants';
import DeleteIcon from '@/assets/Icon/DeleteIcon.svg';

interface InputFieldProps<T> {
  label: string;
  placeholder: string;
  onChangeText: (text: T) => void;
  value: T;
  message?: string;
  messageColor?: string;
  showClearIcon?: boolean;
  onClear?: () => void;
  unit?: string;
}

const deviceWidth = Dimensions.get('screen').width;

function InputField<T extends string | number>({
  label,
  placeholder,
  onChangeText,
  value,
  message,
  messageColor,
  showClearIcon = false,
  onClear,
  unit,
}: InputFieldProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.GRAY_500}
          onChangeText={text => {
            const newValue = typeof value === 'number' ? Number(text) : text;
            onChangeText(newValue as T);
          }}
          value={String(value)}
          keyboardType={typeof value === 'number' ? 'numeric' : 'default'}
        />
        {unit && value.toString().length > 0 && (
          <Text style={styles.unit}>{unit}</Text>
        )}
        {showClearIcon && value.toString().length > 0 && (
          <Pressable onPress={onClear} style={styles.icon}>
            <DeleteIcon width={20} height={20} fill={colors.GRAY_700} />
          </Pressable>
        )}
      </View>
      <View style={styles.line} />
      {message && (
        <Text style={[styles.message, {color: messageColor}]}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#333',
    paddingVertical: 5,
  },
  unit: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
  icon: {
    padding: 8,
  },
  line: {
    height: 1,
    backgroundColor: colors.GREEN_500,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
