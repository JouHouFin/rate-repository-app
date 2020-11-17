import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';

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

const AppBarTab = ({ text, linkTo, onPr }) => {
  return (
    <View style={styles.tab}>
      <Link to={linkTo} component={TouchableOpacity} activeOpacity={0.5} onPress={onPr}>
        <Text style={styles.title}>{text}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {

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
        <AppBarTab text='Repositories' linkTo='/'/>
        {authorizedUser ?
          <>
            <AppBarTab text='Create a review' linkTo='/createReview'/>
          </>
          :
          null
        }
        {authorizedUser ?
          <>
            <AppBarTab text='Sign out' linkTo='/' onPr={signOut}/>
          </>
          :
          <AppBarTab text='Sign in' linkTo='/SignIn'/>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;