import { all } from 'redux-saga/effects';

// sagas
import deviceFetchAllRoot from './deviceFetchAll';
import selectDeviceRoot from './selectDevice';

const deviceSaga = function * rootSaga() {
  yield all([
    deviceFetchAllRoot(),
    selectDeviceRoot(),
  ]);
};

export default deviceSaga;
