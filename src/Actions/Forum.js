export const REQUEST_GET_MORE_FORUM_LIST = 'REQUEST_GET_MORE_FORUM_LIST';
export const SUCCESS_GET_MORE_FORUM_LIST = 'SUCCESS_GET_MORE_FORUM_LIST';
export const FAILURE_GET_MORE_FORUM_LIST = 'FAILURE_GET_MORE_FORUM_LIST';

export function requestGetMoreForumList(payload) {
  return {
    type: REQUEST_GET_MORE_FORUM_LIST ,
    payload
  }
}

export default {
  requestGetMoreForumList
}