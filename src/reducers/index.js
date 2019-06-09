import { combineReducers } from 'redux-immutable';

// reducers
import rootReducer from './root';
import form from './form';
import user from './user';
import session from './session';

const excludeKeys = [
  // keys to carry over when store is cleared
];

export default reducers => rootReducer(
  combineReducers({
    ...reducers,
    form,
    user,
    session,
  }),
  excludeKeys
);
