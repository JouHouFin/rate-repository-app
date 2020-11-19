import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
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

const RepositoryListHeader = ({ setOrder, order, setSearchKeyWord, searchKeyWord }) => {
  const dropdownItems=[
    { label: 'Latest repositories', value: 'CREATED_AT:DESC' },
    { label: 'Highest rated repositories', value: 'RATING_AVERAGE:DESC' },
    { label: 'Lowest rated repositories', value: 'RATING_AVERAGE:ASC' },
  ];

  return (
    <View>
      <Searchbar
        placeholder="Search for a repository"
        onChangeText={query => setSearchKeyWord(query)}
        style={styles.searchBar}
        value={searchKeyWord}
      />
      <RNPickerSelect
        onValueChange={(value) => setOrder(value) }
        items={dropdownItems}
        placeholder={{}}
        value={order}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { order, setOrder, setSearchKeyWord, searchKeyWord } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        setSearchKeyWord={setSearchKeyWord}
        searchKeyWord={searchKeyWord}
      />
    );
  };

  render() {
    const { repositories, handlePress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

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
  const [ orderBy, orderDirection ] = order.split(':');

  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyWord);

  const history = useHistory();
  const handlePress = (item) => {
    history.push(`/repository/${item.id}`);
  };

  return <RepositoryListContainer
    repositories={repositories}
    handlePress={handlePress}
    setOrder={setOrder}
    order={order}
    setSearchKeyWord={setSearchKeyWord}
    searchKeyWord={searchKeyWord}
  />;

};

export default RepositoryList;