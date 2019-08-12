import { Map } from 'immutable';

// constants
import {
  DEVICE_FETCH_ALL,
  DEVICE_CLEAR_ALL,
} from '../constants/deviceTypes';

// lib
import httpReducer from '../lib/httpReducer';

export default function (state = Map(), action) {
  switch (action.type) {
    case DEVICE_FETCH_ALL:
      return httpReducer(state, action, 'device');
    case DEVICE_CLEAR_ALL:
      return Map();
    default:
      return state;
  }
}
