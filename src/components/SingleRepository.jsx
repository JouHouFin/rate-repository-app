import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';

import Text from './Text';
import useRepository from '../hooks/useRepository';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) return <Text>Loading</Text>;

  return (
    <RepositoryItem item={repository} viewSingle={true} />
  );
};

export default SingleRepository;