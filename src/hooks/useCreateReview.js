import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const intRating = parseInt(rating);

    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({ variables: { repositoryName, ownerName, rating: intRating, text } });
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log('e', e);
      throw e;
    }
  };

  return [createReview, result];
};

export default useCreateReview;