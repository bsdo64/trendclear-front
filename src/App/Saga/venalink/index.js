import { all, take, put, call } from 'redux-saga/effects';
import Api from '../../../Utils/ApiClient';
import { normalize } from 'normalizr';
import { participatedVenalinks, venalink as vlink } from '../../../Model/normalizr/schema';

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
      const result = yield call([API, API.get], '/user/venalinks/active',
        payload,
      );

      result.normalized = normalize(result.data, [vlink]);

      yield put(
        { type: SUCCESS_GET_MORE_ACTIVE_VENALINK_LIST, result });
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
      const result = yield call([API, API.get], '/user/venalinks/share',
        payload);

      result.normalized = normalize(result.data, [participatedVenalinks]);

      yield put(
        { type: SUCCESS_GET_MORE_SHARE_VENALINK_LIST, result });
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_SHARE_VENALINK_LIST, error });
    }
  }
}

function* venalink() {
  yield all([
    SagaGetMoreActiveList(),
    SagaGetMoreShareList(),
  ]);
}

export default venalink;
