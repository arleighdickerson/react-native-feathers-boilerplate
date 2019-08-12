import {
  DEVICE_FETCH_ALL_INIT,
  DEVICE_CLEAR_ALL,
} from '../constants/deviceTypes';

// ... session actions

export function deviceFetchAll(params) {
  return {
    type:    DEVICE_FETCH_ALL_INIT,
    payload: params,
  };
}

export function deviceClearAll() {
  return {
    type: DEVICE_CLEAR_ALL,
  };
}
