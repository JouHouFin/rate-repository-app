import React from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory, useParams } from 'react-router-dom';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, loading, handlePress }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  if (loading) return <Text>Loading</Text>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <RepositoryItem item={item}/>
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const history = useHistory();
  const handlePress = (item) => {
    history.push(`/${item.id}`);
  };

  return <RepositoryListContainer repositories={repositories} loading={loading} handlePress={handlePress} />;

};

export default RepositoryList;