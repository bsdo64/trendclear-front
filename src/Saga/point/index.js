import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_CHECK_POINT_CHARGE,
  SUCCESS_CHECK_POINT_CHARGE,
  FAILURE_CHECK_POINT_CHARGE,

  REQUEST_MORE_ACCOUNT_LIST,
  SUCCESS_MORE_ACCOUNT_LIST,
  FAILURE_MORE_ACCOUNT_LIST,

  REQUEST_GET_MORE_CHARGE_LOG_LIST,
  SUCCESS_GET_MORE_CHARGE_LOG_LIST,
  FAILURE_GET_MORE_CHARGE_LOG_LIST,
} from '../../Actions/Point';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaGetMoreChargeLogList() {
  while (WORKING) {
    // REQUEST_GET_MORE_CHARGE_LOG_LIST
    const { payload } = yield take(REQUEST_GET_MORE_CHARGE_LOG_LIST);

    try {
      const result = yield call([API, API.get], '/user/points/chargeLog', payload);
      if (result && !result.error) {
        yield put({ type: SUCCESS_GET_MORE_CHARGE_LOG_LIST, payload: result });
      } else {
        yield put({ type: FAILURE_GET_MORE_CHARGE_LOG_LIST })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_CHARGE_LOG_LIST, error })
    }
  }
}

function* SagaMoreAccountList() {
  while (WORKING) {
    // REQUEST_MORE_ACCOUNT_LIST
    const { payload } = yield take(REQUEST_MORE_ACCOUNT_LIST);

    try {
      const result = yield call([API, API.get], '/user/points', payload);
      if (result && !result.error) {
        yield put({ type: SUCCESS_MORE_ACCOUNT_LIST, payload: result });
      } else {
        yield put({ type: FAILURE_MORE_ACCOUNT_LIST })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_MORE_ACCOUNT_LIST, error })
    }
  }
}

function* SagaCheckPointCharge() {
  while (WORKING) {
    // REQUEST_CHECK_POINT_CHARGE
    const { payload } = yield take(REQUEST_CHECK_POINT_CHARGE);

    try {
      const result = yield call([API, API.post], '/point/check/rp', payload);
      if (result && !result.error) {
        yield put({ type: SUCCESS_CHECK_POINT_CHARGE, result });
      } else {
        yield put({ type: FAILURE_CHECK_POINT_CHARGE })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_POINT_CHARGE, error })
    }
  }
}

export default function* user() {
  yield [
    SagaCheckPointCharge(),
    SagaMoreAccountList(),
    SagaGetMoreChargeLogList(),
  ]
}