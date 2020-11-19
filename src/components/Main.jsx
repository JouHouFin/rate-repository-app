import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const onSubmit = (values) => {
  console.log(values);
};

const Main = () => {
  const [order, setOrder] = useState('CREATED_AT:DESC');

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList order={order} setOrder={setOrder}/>
        </Route>
        <Route path="/SignIn">
          <SignIn onSubmit={onSubmit} />
        </Route>
        <Route path="/SignUp">
          <SignUp onSubmit={onSubmit} />
        </Route>
        <Route path="/createReview">
          <CreateReview />
        </Route>
        <Route path="/repository/:id">
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;