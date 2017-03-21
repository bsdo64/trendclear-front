export const REQUEST_CHECK_POINT_CHARGE = 'REQUEST_CHECK_POINT_CHARGE';
export const SUCCESS_CHECK_POINT_CHARGE = 'SUCCESS_CHECK_POINT_CHARGE';
export const FAILURE_CHECK_POINT_CHARGE = 'FAILURE_CHECK_POINT_CHARGE';

export const REQUEST_MORE_ACCOUNT_LIST = 'REQUEST_MORE_ACCOUNT_LIST';
export const SUCCESS_MORE_ACCOUNT_LIST = 'SUCCESS_MORE_ACCOUNT_LIST';
export const FAILURE_MORE_ACCOUNT_LIST = 'FAILURE_MORE_ACCOUNT_LIST';

export const REQUEST_GET_MORE_CHARGE_LOG_LIST = 'REQUEST_GET_MORE_CHARGE_LOG_LIST';
export const SUCCESS_GET_MORE_CHARGE_LOG_LIST = 'SUCCESS_GET_MORE_CHARGE_LOG_LIST';
export const FAILURE_GET_MORE_CHARGE_LOG_LIST = 'FAILURE_GET_MORE_CHARGE_LOG_LIST';

export const WAITING_CHECK_CHARGE = 'WAITING_CHECK_CHARGE';

export function waitingCheckCharge() {
  return {
    type: WAITING_CHECK_CHARGE,
  };
}

export function requestCheckPointCharge(payload) {
  return {
    type: REQUEST_CHECK_POINT_CHARGE,
    payload,
  };
}

export function failureCheckPointCharge(payload) {
  return {
    type: FAILURE_CHECK_POINT_CHARGE,
    payload,
  };
}

export function requestMoreAccountList(payload) {
  return {
    type: REQUEST_MORE_ACCOUNT_LIST,
    payload,
  };
}

export function requestGetMoreChargeLogList(payload) {
  return {
    type: REQUEST_GET_MORE_CHARGE_LOG_LIST,
    payload,
  };
}
