import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-dom';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 40
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
    />
  );
};

const RepositoryListHeader = ({ setOrder, order, search, searchKeyWord }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search for a repository"
        onChangeText={query => search(query)}
        style={styles.searchBar}
        value={searchKeyWord}
      />
      <Dropdown setOrder={setOrder} order={order} style={styles.searchBar}/>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const order = props.order;
    const setOrder = props.setOrder;
    const search = props.search;
    const searchKeyWord = props.searchKeyWord;

    return (
      <RepositoryListHeader order={order} setOrder={setOrder} search={search} searchKeyWord={searchKeyWord}/>
    );
  };

  render() {
    const props = this.props;
    const repositories = props.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    const handlePress = props.handlePress;

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <RepositoryItem item={item} viewSingle={false}/>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const RepositoryList = ({ order, setOrder }) => {
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [debouncedSearchKeyWord] = useDebounce(searchKeyWord, 500);

  const { repositories, loading } = useRepositories(order, debouncedSearchKeyWord);

  const history = useHistory();
  const handlePress = (item) => {
    history.push(`/repository/${item.id}`);
  };
  if (loading) return <Text>Loading</Text>;

  return <RepositoryListContainer repositories={repositories} handlePress={handlePress} setOrder={setOrder} order={order} search={setSearchKeyWord} searchKeyWord={searchKeyWord}/>;

};

export default RepositoryList;