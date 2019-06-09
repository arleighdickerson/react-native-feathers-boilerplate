import { connect } from 'react-redux';
import {
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';

import Navigator from './routes';

const defaults = {
  key:    'root',
  select: state => state.get('nav'),
};

export default (opts) => {
  const { key, select } = { ...defaults, ...opts };

  const navReducer = createNavigationReducer(Navigator);
  const middleware = createReactNavigationReduxMiddleware(key, select);
  const NavigatorWithRedux = reduxifyNavigator(Navigator, key);

  const mapStateToProps = state => ({ state: select(state) });
  const NavigatorWithState = connect(mapStateToProps)(NavigatorWithRedux);

  return {
    Navigator: NavigatorWithState,
    reducer:   navReducer,
    middleware,
  };
};
