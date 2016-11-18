import { normalize, arrayOf } from 'normalizr';
import { forum } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_FORUM_LIST,
  SUCCESS_GET_MORE_FORUM_LIST,
  FAILURE_GET_MORE_FORUM_LIST,
} from '../../Actions/Forum';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_FORUM_LIST
    const { payload } = yield take(REQUEST_GET_MORE_FORUM_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(forum));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_FORUM_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_FORUM_LIST, error })
    }
  }
}

export default function* forumSaga() {
  yield [
    SagaMoreList()
  ]
}