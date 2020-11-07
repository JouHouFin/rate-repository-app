import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

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
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input}/>
      <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry/>
      <TouchableWithoutFeedback onPress={onSubmit} >
        <Text style={styles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values.username, values.password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;