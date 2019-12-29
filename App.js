/**
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native';
import LoginForm from './app/modules/auth/login';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <LoginForm />
    </>
  );
};

export default App;
