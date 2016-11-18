export const REQUEST_GET_MORE_POST_LIST = 'REQUEST_GET_MORE_POST_LIST';
export const SUCCESS_GET_MORE_POST_LIST = 'SUCCESS_GET_MORE_POST_LIST';
export const FAILURE_GET_MORE_POST_LIST = 'FAILURE_GET_MORE_POST_LIST';

export const REQUEST_GET_INIT_POST_LIST = 'REQUEST_GET_INIT_POST_LIST';
export const SUCCESS_GET_INIT_POST_LIST = 'SUCCESS_GET_INIT_POST_LIST';
export const FAILURE_GET_INIT_POST_LIST = 'FAILURE_GET_INIT_POST_LIST';

export function requestGetInitPostList(payload) {
  return {
    type: REQUEST_GET_INIT_POST_LIST ,
    payload
  }
}

export function requestGetMorePostList(payload) {
  return {
    type: REQUEST_GET_MORE_POST_LIST ,
    payload
  }
}

export default {
  requestGetMorePostList
}