import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// action creators
import {
  destroy,
  startSubmit,
  setSubmitFailed,
  setSubmitSucceeded,
} from 'redux-form';
import { doneIndicator, error } from '../../actions/httpActions';
import {
  sessionValidate,
  sessionInvalidate,
} from '../../actions/sessionActions';

// api
import client, { get } from '../../sources/api/client';
import * as deviceService from '../../sources/usb/deviceService';

// constants
import { SESSION_CREATE } from '../../constants/sessionTypes';
import { CURRENT_DEVICE_FETCH } from '../../constants/deviceTypes';

// lib
import httpSaga from '../../lib/httpSaga';

export function * sessionCreate(action) {
  if (action['@@redux-saga/SAGA_ACTION']) return;

  const FORM = 'login';

  yield put(startSubmit(FORM));

  const payload = action.payload || {};
  const { email, password } = payload;

  const authOptions = {
    strategy: 'local',
    email,
    password,
  };

  try {
    const { accessToken } = yield * httpSaga(SESSION_CREATE, call(client.authenticate, authOptions));

    const { deviceId } = yield client.passport.verifyJWT(accessToken);

    yield * httpSaga(CURRENT_DEVICE_FETCH, call(get, deviceService, deviceId));

    yield put(setSubmitSucceeded(FORM));

    yield put(sessionValidate());

    yield put(destroy(FORM));
  } catch (err) {
    yield put(error(SESSION_CREATE, err));
    yield put(setSubmitFailed(FORM));
    yield put(sessionInvalidate());
  } finally {
    yield put(doneIndicator(SESSION_CREATE));
  }
}

export function * watchSessionCreate() {
  yield takeEvery(SESSION_CREATE, sessionCreate);
}

export default function * sessionCreateRoot() {
  yield all([
    fork(watchSessionCreate),
  ]);
}
