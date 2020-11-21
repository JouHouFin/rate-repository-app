import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format, parseISO } from 'date-fns';

import Text from './Text';
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

export const ReviewItem = ({ review, myReviews }) => {
  return (
    <View style={styles.mainReviewContainer}>
      <View style={styles.reviewDetailsContainer}>
        <Text style={styles.points} fontWeight="bold">{review.rating}</Text>
        <Text style={styles.usernameAndDate}>
          { myReviews ?
            <Text fontWeight="bold">{review.repository.fullName}{'\n'}</Text>
            :
            <Text fontWeight="bold">{review.user.username}{'\n'}</Text>
          }
          <Text style={{ color: 'grey' }}>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        </Text>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};