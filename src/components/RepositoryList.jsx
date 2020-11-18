import React from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Dropdown = ({ setOrder, order }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => value !== null ? setOrder(value) : setOrder(order)}
      items={[
        { label: 'Latest repositories', value: { mode: 'CREATED_AT', order: 'DESC' } },
        { label: 'Highest rated repositories', value: { mode: 'RATING_AVERAGE', order: 'DESC' } },
        { label: 'Lowest rated repositories', value: { mode: 'RATING_AVERAGE', order: 'ASC' } },
      ]}
      value={order}
    />
  );
};

export const RepositoryListContainer = ({ repositories, loading, handlePress, setOrder, order }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  if (loading) return <Text>Loading</Text>;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={Dropdown({ setOrder, order })}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <RepositoryItem item={item} viewSingle={false}/>
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = ({ order, setOrder }) => {
  const { repositories, loading } = useRepositories(order);

  const history = useHistory();
  const handlePress = (item) => {
    history.push(`/repository/${item.id}`);
  };

  return <RepositoryListContainer repositories={repositories} loading={loading} handlePress={handlePress} setOrder={setOrder} order={order}/>;

};

export default RepositoryList;