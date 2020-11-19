import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepository = ( id ) => {
  const { data, loading, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  return { repository: data ? data.repository : null, loading, refetch };
};

export default useRepository;

