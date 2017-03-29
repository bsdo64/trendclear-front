import { take, put, call } from 'redux-saga/effects';
import Api from '../../../Utils/ApiClient';

import {
  REQUEST_REPORT,
  SUCCESS_REPORT,
  FAILURE_REPORT,
} from '../../Actions/Report';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaReport() {
  while (WORKING) {
    // REQUEST_REPORT
    const { payload } = yield take(REQUEST_REPORT);

    try {
      yield call([Api, API.post], '/user/report', payload);

      yield put({ type: SUCCESS_REPORT });
    }

    catch (error) {
      yield put({ type: FAILURE_REPORT, error });
    }
  }
}

function* reportSaga() {
  yield [
    SagaReport(),
  ];
}

export default reportSaga;
