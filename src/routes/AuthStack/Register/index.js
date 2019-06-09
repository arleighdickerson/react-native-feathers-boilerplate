// @flow

import RegisterContainer from './RegisterContainer';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import React from 'react';

function handleBackPress(dispatch) {
  return () => {
    dispatch(NavigationActions.back());
    return true;
  };
}

type Props = {
  dispatch: Function,
}

const Container = ({ dispatch }: Props) => (
  <AndroidBackHandler onBackPress={ handleBackPress(dispatch) }>
    <RegisterContainer />
  </AndroidBackHandler>
);

export default connect()(Container);
