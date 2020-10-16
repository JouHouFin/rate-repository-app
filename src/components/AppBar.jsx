import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    padding: 15,
  },
  title: {
    color: theme.colors.appBarText,
  }
});

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.tab}>
      <TouchableWithoutFeedback>
        <Text style={styles.title}>{text}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text='Repositories' />
    </View>
  );
};

export default AppBar;