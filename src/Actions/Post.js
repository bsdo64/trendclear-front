export const REQUEST_GET_MORE_LIST = 'REQUEST_GET_MORE_LIST';
export const SUCCESS_GET_MORE_LIST = 'SUCCESS_GET_MORE_LIST';
export const FAILURE_GET_MORE_LIST = 'FAILURE_GET_MORE_LIST';

export function requestGetMoreList(payload) {
  return {
    type: REQUEST_GET_MORE_LIST ,
    payload
  }
}

export default {
  requestGetMoreList
}