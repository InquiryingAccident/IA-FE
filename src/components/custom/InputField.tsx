import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {mergeRefs} from '@/utils';
import {colors} from '@/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface InputFieldProps extends TextInputProps {
  title?: string;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  message?: string;
  check?: boolean;
  available?: boolean;
  checkedButton?: () => void;
  ischecked?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {
      title,
      disabled = false,
      error,
      touched,
      message,
      check = false,
      available = false,
      checkedButton,
      ischecked = false,
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
            touched && !error && check && !available && styles.inputError,
            touched && !error && check && available && styles.inputAvailable,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {check && !ischecked && (
            <Pressable style={styles.checkedButton} onPress={checkedButton}>
              <Text style={styles.checkedButtonText}>중복확인</Text>
            </Pressable>
          )}
          {check && ischecked && (
            <View style={styles.verifiedIconContainer}>
              {/* <Icon name="check-circle" size={20} color={colors.BLUE_BASIC} /> */}
              <MaterialIcons name="check" size={30} color={colors.BLUE_BASIC} />
            </View>
          )}
        </View>
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
        {!Boolean(error) && (
          <Text
            style={[
              styles.unError,
              available ? styles.availableText : styles.notAvailableText,
            ]}>
            {message}
          </Text>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: deviceHeight > 700 ? 15 : 10,
    height: deviceHeight > 700 ? 56 : 50,
    flexDirection: 'row',
  },
  title: {
    marginBottom: 12,
    fontSize: 16,
    left: 4,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
    flex: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  checkedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLUE_BASIC,
    borderRadius: 4,
    flex: 0.2,
  },
  checkedButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.WHITE,
  },
  verifiedIconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputError: {
    borderColor: colors.RED_300,
    borderWidth: 1,
  },
  inputAvailable: {
    borderColor: colors.BLUE_BASIC,
    borderWidth: 1,
  },
  error: {
    left: 4,
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 10,
  },
  unError: {
    left: 4,
    fontSize: 12,
    marginTop: 10,
  },
  availableText: {
    color: colors.BLUE_BASIC,
  },
  notAvailableText: {
    color: colors.RED_500,
  },
});

export default InputField;
