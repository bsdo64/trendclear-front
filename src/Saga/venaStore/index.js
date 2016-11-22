import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILURE_RESET_PASSWORD,

} from '../../Actions/User';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');


export default function* user() {
  yield [

  ]
}