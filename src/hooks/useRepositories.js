import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( order, searchKeyword ) => {

  const searchKw = searchKeyword ? searchKeyword  : '';
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: order.mode, orderDirection: order.order, searchKeyword: searchKeyword }
  });

  return { repositories: data ? data.repositories : null, loading, refetch };
};

export default useRepositories;

