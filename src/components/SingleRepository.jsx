import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { format, parseISO } from 'date-fns';

import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  mainReviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white'
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  usernameAndDate: {
    textAlignVertical: 'center',
  },
  lowerContainer: {
    marginLeft: 50,
  },
  points: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    color: theme.colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10
  }
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} viewSingle={true} />
      <ItemSeparator />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainReviewContainer}>
      <View style={styles.upperContainer}>
        <Text style={styles.points} fontWeight="bold">{review.rating}</Text>
        <Text style={styles.usernameAndDate}>
          <Text fontWeight="bold">{review.user.username}{'\n'}</Text>
          <Text style={{ color: 'grey' }}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        </Text>
      </View>
      <View style={styles.lowerContainer}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const SingleRepositoryContainer = ({ repository, loading }) => {
  if (loading) return <Text>Loading</Text>;

  const reviews = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      stickyHeaderIndices={[0]}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  return <SingleRepositoryContainer repository={repository} loading={loading}/>;
};

export default SingleRepository;