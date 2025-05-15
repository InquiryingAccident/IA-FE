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
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
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
    const {theme} = useThemeStore();
    const styles = styling(theme);
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
            placeholderTextColor={colors[theme].GRAY_500}
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
              {/* <Icon name="check-circle" size={20} color={colors[theme].BLUE_BASIC} /> */}
              <MaterialIcons
                name="check"
                size={30}
                color={colors[theme].BLUE_BASIC}
              />
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
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
      color: colors[theme].BLACK,
      padding: 0,
      flex: 0.8,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
    checkedButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].BLUE_BASIC,
      borderRadius: 4,
      flex: 0.2,
    },
    checkedButtonText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors[theme].WHITE,
    },
    verifiedIconContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputError: {
      borderColor: colors[theme].RED_300,
      borderWidth: 1,
    },
    inputAvailable: {
      borderColor: colors[theme].BLUE_BASIC,
      borderWidth: 1,
    },
    error: {
      left: 4,
      color: colors[theme].RED_500,
      fontSize: 12,
      marginTop: 10,
    },
    unError: {
      left: 4,
      fontSize: 12,
      marginTop: 10,
    },
    availableText: {
      color: colors[theme].BLUE_BASIC,
    },
    notAvailableText: {
      color: colors[theme].RED_500,
    },
  });

export default InputField;
