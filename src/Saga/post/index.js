import { normalize, arrayOf } from 'normalizr';
import { post } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_POST_LIST,
  SUCCESS_GET_MORE_POST_LIST,
  FAILURE_GET_MORE_POST_LIST,

  REQUEST_GET_INIT_POST_LIST,
  SUCCESS_GET_INIT_POST_LIST,
  FAILURE_GET_INIT_POST_LIST,
} from '../../Actions/Post';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaInitList() {
  while (WORKING) {
    // REQUEST_GET_INIT_POST_LIST
    const { payload } = yield take(REQUEST_GET_INIT_POST_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_INIT_POST_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_INIT_POST_LIST, error })
    }
  }
}

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_POST_LIST
    const { payload } = yield take(REQUEST_GET_MORE_POST_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_POST_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_POST_LIST, error })
    }
  }
}

export default function* postSaga() {
  yield [
    SagaMoreList(),
    SagaInitList(),
  ]
}