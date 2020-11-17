import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const usesignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { username, password } });
      console.log(data);
    } catch (e) {
      console.log('E', e);
      throw e;
    }
  };

  return [signUp, result];
};

export default usesignUp;