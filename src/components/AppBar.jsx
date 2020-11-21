import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

import Text from './Text';
import theme from '../theme';
import { CHECK_AUTHORIZATION } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

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

const AppBarTab = ({ loc, text, linkTo, onPr }) => {
  let style = styles.title;

  if (loc === linkTo) {
    style = [styles.title, { textDecorationLine: 'underline', fontWeight: 'bold' }];
  }

  return (
    <View style={styles.tab}>
      <Link to={linkTo} component={TouchableOpacity} activeOpacity={0.5} onPress={onPr}>
        <Text style={style}>{text}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  let location = useLocation();

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const accessToken = authStorage.getAccessToken();

  let authorizedUser = null;

  if (accessToken) {
    const { data } = useQuery(CHECK_AUTHORIZATION, {
      fetchPolicy: 'cache-and-network'
    });

    if (data) {
      data.authorizedUser !== null ?
        authorizedUser = data.authorizedUser
        :
        authorizedUser = null;
    }

  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab loc={location.pathname} text='Repositories' linkTo='/'/>
        {authorizedUser ?
          <>
            <AppBarTab loc={location.pathname} text='Create a review' linkTo='/CreateReview' />
            <AppBarTab loc={location.pathname} text='My reviews' linkTo='/MyReviews'/>
            <AppBarTab text='Sign out' linkTo='/' onPr={signOut}/>
          </>
          :
          <>
            <AppBarTab loc={location.pathname} text='Sign in' linkTo='/SignIn'/>
            <AppBarTab loc={location.pathname} text='Sign up' linkTo='/SignUp'/>
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;