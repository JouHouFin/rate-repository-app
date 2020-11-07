import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error
  },
  notError: {
    borderColor: 'black'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error ? styles.error : styles.notError];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;