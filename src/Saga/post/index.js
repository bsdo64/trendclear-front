import { normalize, arrayOf } from 'normalizr';
import { post } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_LIST,
  SUCCESS_GET_MORE_LIST,
  FAILURE_GET_MORE_LIST,

  REQUEST_GET_INIT_LIST,
  SUCCESS_GET_INIT_LIST,
  FAILURE_GET_INIT_LIST,
} from '../../Actions/Post';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaInitList() {
  while (WORKING) {
    // REQUEST_GET_INIT_LIST
    const { payload } = yield take(REQUEST_GET_INIT_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_INIT_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_INIT_LIST, error })
    }
  }
}

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_LIST
    const { payload } = yield take(REQUEST_GET_MORE_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_LIST, error })
    }
  }
}

export default function* login() {
  yield [
    SagaMoreList(),
    SagaInitList(),
  ]
}