import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const usesignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      await mutate({ variables: { username, password } });
    } catch (e) {
      console.log('e3', e);
      throw e;
    }
  };

  return [signUp, result];
};

export default usesignUp;