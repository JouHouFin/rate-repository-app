import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( orderBy, orderDirection, searchKeyword ) => {

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });

  return { repositories: data ? data.repositories : null, loading, refetch };
};

export default useRepositories;

