import React from 'react';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import { AsyncStorage } from 'react-native';

import createNavigator from './createNavigator';
import createStore from './createStore';

import PersistGate from './components/PersistGate';
import Splash from './components/Splash';

import { sessionVerify } from './actions/sessionActions';

import * as Watcher from './util/Watcher';

(async () => {
  const files = await Watcher.showFiles();
  console.log(files);
})();

const { Navigator, ...nav } = createNavigator();

const store = createStore({
  middleware: [
    nav.middleware,
  ],
  reducers:   {
    nav: nav.reducer,
  },
  enhancers:  [
    autoRehydrate(),
  ],
});

const ready = new Promise((resolve, reject) => persistStore(
  store, {
    storage:   AsyncStorage,
    whitelist: [
      'currentUser',
    ],
  },
  err => (err ? reject(err) : resolve(true)),
));

const afterLift = () => store.dispatch(sessionVerify());

export default () => (
  <Provider store={store}>
    <PersistGate ready={ready} loading={<Splash/>} afterLift={afterLift}>
      <Navigator/>
    </PersistGate>
  </Provider>
);
