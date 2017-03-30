import { take, put, call } from 'redux-saga/effects';
import Api from '../../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_ACTIVE_VENALINK_LIST,
  SUCCESS_GET_MORE_ACTIVE_VENALINK_LIST,
  FAILURE_GET_MORE_ACTIVE_VENALINK_LIST,

  REQUEST_GET_MORE_SHARE_VENALINK_LIST,
  SUCCESS_GET_MORE_SHARE_VENALINK_LIST,
  FAILURE_GET_MORE_SHARE_VENALINK_LIST,
} from '../../Actions/Venalink';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaGetMoreActiveList() {
  while (WORKING) {
    // REQUEST_GET_MORE_ACTIVE_VENALINK_LIST
    const { payload } = yield take(REQUEST_GET_MORE_ACTIVE_VENALINK_LIST);

    try {
      const result = yield call([API, API.get], '/venalink/participate',
        payload,
      );

      yield put(
        { type: SUCCESS_GET_MORE_ACTIVE_VENALINK_LIST, payload: result });
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_ACTIVE_VENALINK_LIST, error });
    }
  }
}

function* SagaGetMoreShareList() {
  while (WORKING) {
    // REQUEST_GET_MORE_SHARE_VENALINK_LIST
    const { payload } = yield take(REQUEST_GET_MORE_SHARE_VENALINK_LIST);

    try {
      const result = yield call([API, API.get], '/venalink/participate',
        payload);

      yield put(
        { type: SUCCESS_GET_MORE_SHARE_VENALINK_LIST, payload: result });
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_SHARE_VENALINK_LIST, error });
    }
  }
}

function* venalink() {
  yield [
    SagaGetMoreActiveList(),
    SagaGetMoreShareList(),
  ];
}

export default venalink;
