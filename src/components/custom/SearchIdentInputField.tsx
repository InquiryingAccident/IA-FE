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
import Icon from './CustomIcon';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  onPress: () => void;
}

const deviceHeight = Dimensions.get('screen').height;

const SearchIdentInputField = forwardRef(
  (
    {disabled = false, error, touched, onPress, ...props}: InputFieldProps,
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
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
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
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
          <Pressable style={styles.searchIcon} onPress={() => onPress()}>
            <Icon name="SearchIconBlue" />
          </Pressable>
        </View>
      </Pressable>
    );
  },
);

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 3,
      borderRadius: 8,
      borderColor: colors[theme].BLUE_BASIC,
      padding: deviceHeight > 700 ? 15 : 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      fontSize: 16,
      color: colors[theme].BLACK,
      padding: 0,
    },
    disabled: {
      backgroundColor: colors[theme].GRAY_200,
      color: colors[theme].GRAY_700,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors[theme].RED_300,
    },
    error: {
      color: colors[theme].RED_500,
      fontSize: 12,
      paddingTop: 5,
    },
    searchIcon: {
      margin: 4,
      width: 20,
      height: 20,
      // backgroundColor: '#333',
    },
  });

export default SearchIdentInputField;
