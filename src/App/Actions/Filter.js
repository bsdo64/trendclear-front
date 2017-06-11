export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export function addFilter(payload) {
  return {
    type: ADD_FILTER,
    payload,
  };
}

export function removeFilter(payload) {
  return {
    type: REMOVE_FILTER,
    payload,
  };
}
