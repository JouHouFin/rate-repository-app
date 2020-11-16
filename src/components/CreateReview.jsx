import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialValues = { repositoryOwner: '', repositoryName: '', rating: '', review: '' };

import theme from '../theme';

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .min(5, 'Password must be at least five characters')
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
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
  }
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="repositoryOwner" testID="repositoryOwner" placeholder="repositoryOwner" style={styles.input}/>
      <FormikTextInput name="repositoryName" testID="repositoryName" placeholder="repositoryName" style={styles.input} />
      <FormikTextInput name="rating" testID="rating" placeholder="rating" style={styles.input} />
      <FormikTextInput name="review" testID="review" placeholder="review" style={styles.input} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBtn">
        <Text style={styles.button}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CreateReview = () => {
  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values;

    try {
      console.log(repositoryOwner, repositoryName, rating, review);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit}/>;

};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};


export default CreateReview;