import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { username, password } });
      console.log(data);
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      history.push('/');
    } catch (e) {
      console.log('e');
      return e;
    }
  };

  return [signIn, result];
};

export default useSignIn;