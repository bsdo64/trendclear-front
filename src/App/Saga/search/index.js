import { all, take, put, call } from 'redux-saga/effects';
import Api from '../../../Utils/ApiClient';

import {
  REQUEST_SEARCH_QUERY_RANK,
  SUCCESS_SEARCH_QUERY_RANK,
  FAILURE_SEARCH_QUERY_RANK
} from '../../Actions/Search';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaGetMoreShareList() {
  while (WORKING) {
    // REQUEST_SEARCH_QUERY_RANK
    const { payload } = yield take(REQUEST_SEARCH_QUERY_RANK);

    try {
      const result = yield call([API, API.get], '/search/queryRank', payload);

      yield put({ type: SUCCESS_SEARCH_QUERY_RANK, payload: result });
    }

    catch (error) {
      yield put({ type: FAILURE_SEARCH_QUERY_RANK, error });
    }
  }
}

function* venalink() {
  yield all([
    SagaGetMoreShareList(),
  ]);
}

export default venalink;
