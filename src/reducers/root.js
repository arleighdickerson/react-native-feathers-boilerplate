import Immutable from 'immutable';

// constants
import { STORE_CLEAR } from '../constants/storeTypes';

export default (reducers, excludeKeys = []) => (oldState, action) => {
  let newState = oldState;

  if (action.type === STORE_CLEAR) {
    const initialState = {};

    excludeKeys.forEach((key) => {
      if (oldState.has(key)) {
        initialState[key] = oldState.get(key);
      }
    });

    newState = Immutable.Map(initialState);
  }

  return reducers(newState, action);
};
