import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILURE_RESET_PASSWORD,

} from '../../Actions/User';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaResetPassword() {
  while (WORKING) {
    // REQUEST_RESET_PASSWORD
    const { payload } = yield take(REQUEST_RESET_PASSWORD);

    try {
      const result = yield call([Api, API.post], '/user/resetPassword', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_RESET_PASSWORD, result })
      } else {
        yield put({ type: FAILURE_RESET_PASSWORD, result })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_RESET_PASSWORD, error })
    }
  }
}

export default function* user() {
  yield [
    SagaResetPassword(),
  ]
}