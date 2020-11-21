import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import Text from './Text';
import { ReviewItem } from './ReviewItem';
import { CHECK_AUTHORIZATION } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
    padding: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const MyReviews = () => {
  const authStorage = useContext(AuthStorageContext);

  const accessToken = authStorage.getAccessToken();

  let authorizedUser = null;

  if (accessToken) {
    const { data } = useQuery(CHECK_AUTHORIZATION, {
      fetchPolicy: 'cache-and-network',
      variables: { includeReviews: true }
    });

    if (data) {
      data.authorizedUser !== null ?
        authorizedUser = data.authorizedUser
        :
        authorizedUser = null;
    }

  }

  const reviews = authorizedUser
    ? authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  if (!authorizedUser) return <Text>Loading</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} myReviews/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};