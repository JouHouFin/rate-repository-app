import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = { username: '', password: '' };

import theme from '../theme';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least one character long')
    .max(30, 'Username must be maximum of 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least five characters long')
    .max(50, 'Password must be maximum of 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')],'Password does not match').required('Password is required')
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
    paddingTop: 15,
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} fontWeight="bold">Create an account</Text>
      <FormikTextInput name="username" testID="username" placeholder="Username" style={styles.input}/>
      <FormikTextInput name="password" testID="password" placeholder="Password" style={styles.input} secureTextEntry/>
      <FormikTextInput name="passwordConfirmation" testID="passwordConfirmation" placeholder="Confirm your password" style={styles.input} secureTextEntry/>
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBtn">
        <Text style={styles.button}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });

    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit}/>;

};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};


export default SignUp;