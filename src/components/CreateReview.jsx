import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = { ownerName: '', repositoryName: '', rating: '', review: '' };

import theme from '../theme';

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 0
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 10,
    height: 40,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 40,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 15,
  },
  invalid: {
    color: theme.colors.error
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    textAlign: 'center',
    padding: 15,
  }
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" testID="ownerName" placeholder="Repository owner" style={styles.input}/>
      <FormikTextInput name="repositoryName" testID="repositoryName" placeholder="Repository name" style={styles.input} />
      <FormikTextInput name="rating" keyboardType={'numeric'} testID="rating" placeholder="Rating (between 0 and 100)" style={styles.input} />
      <FormikTextInput name="text" testID="text" placeholder="Review" style={[styles.input, { height: 100 }]} multiline={true} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBtn">
        <Text style={styles.button}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      createReview({ ownerName, repositoryName, rating, text });
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit}/>;

};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>

  );
};


export default CreateReview;