import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      return mutate({ variables: { username, password } });
    } catch (e) {
      console.log('e');
    }
  };

  return [signIn, result];
};

export default useSignIn;