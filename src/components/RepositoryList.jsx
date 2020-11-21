import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-dom';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

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

const RepositoryListHeader = ({ setOrder, order, setSearchKeyword, searchKeyword }) => {
  const dropdownItems=[
    { label: 'Latest repositories', value: 'CREATED_AT:DESC' },
    { label: 'Highest rated repositories', value: 'RATING_AVERAGE:DESC' },
    { label: 'Lowest rated repositories', value: 'RATING_AVERAGE:ASC' },
  ];

  return (
    <View>
      <Searchbar
        placeholder="Search for a repository"
        onChangeText={query => setSearchKeyword(query)}
        style={styles.searchBar}
        value={searchKeyword}
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
    const { order, setOrder, setSearchKeyword, searchKeyword } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        setSearchKeyword={setSearchKeyword}
        searchKeyWord={searchKeyword}
      />
    );
  };

  render() {
    const { repositories, handlePress, onEndReach } = this.props;

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
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = ({ order, setOrder }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const [ orderBy, orderDirection ] = order.split(':');

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword
  });


  const onEndReach = () => {
    fetchMore();
  };

  const history = useHistory();
  const handlePress = (item) => {
    history.push(`/repository/${item.id}`);
  };

  if (!repositories) return <Text>Loading</Text>;

  return <RepositoryListContainer
    repositories={repositories}
    handlePress={handlePress}
    setOrder={setOrder}
    order={order}
    setSearchKeyword={setSearchKeyword}
    searchKeyWord={searchKeyword}
    onEndReach={onEndReach}
  />;

};

export default RepositoryList;