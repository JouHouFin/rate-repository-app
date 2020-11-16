import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { toKilos } from '../utils/misc';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  tinyAvatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginRight: 5
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
  },
  link: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 15,
    borderRadius: 5,
    margin: 5,
    flexGrow: 1,
    textAlign: 'center'
  }
});

const RepositoryItemGeneralInfo = ({ item }) => {
  return (
    <View style={styles.rowContainer}>
      <Image style={styles.tinyAvatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.columnContainer}>
        <Text fontWeight="bold" testID="fullName">{item.fullName}</Text>
        <Text style={{ marginTop: 5 }} testID="description">{item.description}</Text>
        <Text style={styles.language} testID="language">{item.language}</Text>
      </View>
    </View>
  );
};

const RepositoryItemNumbers = ({ item }) => {
  return (
    <View style={styles.detailsRowContainer}>
      <View style={styles.rowItem}>
        <Text fontWeight="bold" testID="stargazersCount">
          {toKilos(item.stargazersCount)}k
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold" testID="forksCount">
          {toKilos(item.forksCount)}k
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold" testID="reviewCount">
          {item.reviewCount}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.rowItem}>
        <Text fontWeight="bold" testID="ratingAverage">
          {item.ratingAverage}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, viewSingle }) => {
  const handleLinkPressed = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.columnContainer} testID="RepositoryItem">
      <RepositoryItemGeneralInfo item={item} testID="GeneralInfo"/>
      <RepositoryItemNumbers item={item} testID="Numbers"/>
      {viewSingle ? <Text style={styles.link} onPress={() => handleLinkPressed(item.url)}>Open in GitHub</Text> : null }
    </View>
  );
};

export default RepositoryItem;