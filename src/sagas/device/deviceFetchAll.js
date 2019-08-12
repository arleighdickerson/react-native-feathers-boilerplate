import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// action creators
import { doneIndicator, error } from '../../actions/httpActions';

// api
import { find } from '../../sources/api/client';
import * as deviceService from '../../sources/usb/deviceService';

// constants
import {
  DEVICE_FETCH_ALL,
  DEVICE_FETCH_ALL_INIT,
} from '../../constants/deviceTypes';

// lib
import httpSaga from '../../lib/httpSaga';

// schemas
import { deviceListSchema } from '../../schemas/device';

export function * deviceFetchAll(action) {
  if (action['@@redux-saga/SAGA_ACTION']) return;

  try {
    yield * httpSaga(DEVICE_FETCH_ALL, call(find, deviceService), {
      schema: deviceListSchema,
      entity: 'device',
    });
  } catch (err) {
    yield put(error(DEVICE_FETCH_ALL, err));
  } finally {
    yield put(doneIndicator(DEVICE_FETCH_ALL));
  }
}

export function * watchDeviceFetchAll() {
  yield takeEvery(DEVICE_FETCH_ALL_INIT, deviceFetchAll);
}

export default function * root() {
  yield all([
    fork(watchDeviceFetchAll),
  ]);
}
