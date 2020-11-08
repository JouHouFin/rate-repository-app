import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
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
  },
  scroll: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const AppBarTab = ({ text, linkTo }) => {
  return (
    <View style={styles.tab}>
      <Link to={linkTo} component={TouchableOpacity} activeOpacity={0.5}>
        <Text style={styles.title}>{text}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab text='Repositories' linkTo='/'/>
        <AppBarTab text='Sign in' linkTo='/SignIn'/>
      </ScrollView>
    </View>
  );
};

export default AppBar;