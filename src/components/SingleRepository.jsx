import React from 'react';
import { View, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';

const SingleRepository = () => {
  //const { id } = useParams();
  console.log('here');

  //const item = useRepository(id);
  //console.log('item', item);

  return (
    //<RepositoryItem item={item} viewSingle={true} />
    <View>
      <Text>
        {'here'}
      </Text>
    </View>
  );
};

export default SingleRepository;