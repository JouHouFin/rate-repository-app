import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( order ) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy: order.mode, orderDirection: order.order }
  });

  return { repositories: data ? data.repositories : null, loading, refetch };
};

export default useRepositories;

