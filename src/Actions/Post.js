export const REQUEST_GET_MORE_POST_LIST = 'REQUEST_GET_MORE_POST_LIST';
export const SUCCESS_GET_MORE_POST_LIST = 'SUCCESS_GET_MORE_POST_LIST';
export const FAILURE_GET_MORE_POST_LIST = 'FAILURE_GET_MORE_POST_LIST';

export const REQUEST_SUBMIT_POST = 'REQUEST_SUBMIT_POST';
export const SUCCESS_SUBMIT_POST = 'SUCCESS_SUBMIT_POST';
export const FAILURE_SUBMIT_POST = 'FAILURE_SUBMIT_POST';

export const REQUEST_GET_INIT_POST_LIST = 'REQUEST_GET_INIT_POST_LIST';
export const SUCCESS_GET_INIT_POST_LIST = 'SUCCESS_GET_INIT_POST_LIST';
export const FAILURE_GET_INIT_POST_LIST = 'FAILURE_GET_INIT_POST_LIST';

export const REMOVE_SERVER_INIT = 'REMOVE_SERVER_INIT';
export const HANDLE_POST_TITLE = 'HANDLE_POST_TITLE';
export const HANDLE_POST_CONTENT = 'HANDLE_POST_CONTENT';
export const HANDLE_RESET_POST_CONTENT = 'HANDLE_RESET_POST_CONTENT';
export const HANDLE_SELECT_PREFIX = 'HANDLE_SELECT_PREFIX';
export const HANDLE_ADD_POST_IMAGES = 'HANDLE_ADD_POST_IMAGES';
export const HANDLE_DELETE_POST_IMAGES = 'HANDLE_DELETE_POST_IMAGES';
export const HANDLE_SET_REPRESENT_IMAGE = 'HANDLE_SET_REPRESENT_IMAGE';

export function handleSetRepresentImage(index) {
  return {
    type: HANDLE_SET_REPRESENT_IMAGE,
    index
  }
}

export function handleDeletePostImages(deleteUrl) {
  return {
    type: HANDLE_DELETE_POST_IMAGES,
    deleteUrl
  }
}

export function handleAddPostImages(data) {
  return {
    type: HANDLE_ADD_POST_IMAGES,
    data
  }
}

export function handleSelectPrefix(prefixId) {
  return {
    type: HANDLE_SELECT_PREFIX,
    prefixId
  }
}

export function handleResetPostContent() {
  return {
    type: HANDLE_RESET_POST_CONTENT
  }
}

export function handlePostContent(postContent) {
  return {
    type: HANDLE_POST_CONTENT,
    postContent
  }
}

export function handlePostTitle(title) {
  return {
    type: HANDLE_POST_TITLE,
    title
  }
}

export function removeServerInit() {
  return {
    type: REMOVE_SERVER_INIT
  }
}

export function requestSubmitPost(payload) {
  return {
    type: REQUEST_SUBMIT_POST,
    payload
  }
}

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