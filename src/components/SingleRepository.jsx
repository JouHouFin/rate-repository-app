import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useBackHandler } from '@react-native-community/hooks';

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
  reviewDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  usernameAndDate: {
    textAlignVertical: 'center',
  },
  reviewTextContainer: {
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
      <View style={styles.reviewDetailsContainer}>
        <Text style={styles.points} fontWeight="bold">{review.rating}</Text>
        <Text style={styles.usernameAndDate}>
          <Text fontWeight="bold">{review.user.username}{'\n'}</Text>
          <Text style={{ color: 'grey' }}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        </Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const SingleRepositoryContainer = ({ repository, onEndReach }) => {

  const repo = repository
    ? repository
    : {};

  const reviews = repository
    ? repo.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repo} />}
      ItemSeparatorComponent={ItemSeparator}
      stickyHeaderIndices={[0]}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 8 });
  const history = useHistory();

  const onBackPress = () => {
    history.goBack();
    return true;
  };
  const onEndReach = () => {
    fetchMore();
  };

  useBackHandler(onBackPress);

  return <SingleRepositoryContainer repository={repository} onEndReach={onEndReach} />;
};

export default SingleRepository;