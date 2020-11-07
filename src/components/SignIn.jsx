import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const initialValues = { username: '', password: '' };

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center'
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;