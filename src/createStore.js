import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import createReducer from './reducers';
import rootSaga from './sagas';


export default ({ middleware = [], enhancers = [], reducers = {} } = {}) => {
  const isDev = !!global.__DEV__;

  const sagaMiddleWare = createSagaMiddleware();

  const defaultMiddleware = [
    sagaMiddleWare,
  ];

  if (isDev) {
    // eslint-disable-next-line
    XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

    middleware.push(createLogger({
      stateTransformer: state => state.toJS(),
    }));
  }

  const enhancer = (
    isDev
      // eslint-disable-next-line global-require
      ? require('remote-redux-devtools').composeWithDevTools({ realtime: true })
      : compose
  )(
    applyMiddleware(...defaultMiddleware, ...middleware),
    ...enhancers
  );

  // create store
  const store = createStore(createReducer(reducers), enhancer);

  // start sags
  sagaMiddleWare.run(rootSaga);

  return store;
};
