import { Map } from 'immutable';

// constants
import { CURRENT_DEVICE_FETCH } from '../constants/deviceTypes';

// lib
import httpReducer from '../lib/httpReducer';

export default function (state = Map(), action) {
  switch (action.type) {
    case CURRENT_DEVICE_FETCH:
      return httpReducer(state, action);
    default:
      return state;
  }
}
