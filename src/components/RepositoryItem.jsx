import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: 'white',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  detailsRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowItem: {
    padding: 5,
    flexGrow: 1,
    alignItems: 'center',
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5
  }
});

const RepositoryItemGeneralInfo = ({ item }) => {
  return (
    <View style={styles.rowContainer}>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.columnContainer}>
        <Text fontWeight="bold">{item.fullName}</Text>
        <Text style={{ marginTop: 5 }} >{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
  );
};

const RepositoryItemNumbers = ({ item }) => {
  return (
    <View style={styles.detailsRowContainer}>
      <View style={styles.rowItem}>
        <Text fontWeight="bold">
          {Math.round(item.stargazersCount/1000*10)/10}k
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold">
          {Math.round(item.forksCount/1000*10)/10}k
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold">
          {item.reviewCount}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold">
          {item.ratingAverage}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.columnContainer}>
      <RepositoryItemGeneralInfo item={item} />
      <RepositoryItemNumbers item={item} />
    </View>
  );
};

export default RepositoryItem;