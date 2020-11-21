import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
const initialValues = { username: '', password: '' };

import theme from '../theme';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least five characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least five characters')
    .required('Password is required'),
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" testID="username" placeholder="Username" style={styles.input}/>
      <FormikTextInput
        name="password"
        testID="password"
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBtn">
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = ({ setOrder }) => {
  const [signIn] = useSignIn();
  setOrder('CREATED_AT:DESC');

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit}/>;

};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};


export default SignIn;