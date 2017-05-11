export const INPUT_SEARCH_QUERY = 'INPUT_SEARCH_QUERY';

export const REQUEST_SEARCH_QUERY_RANK = 'REQUEST_SEARCH_QUERY_RANK';
export const SUCCESS_SEARCH_QUERY_RANK = 'SUCCESS_SEARCH_QUERY_RANK';
export const FAILURE_SEARCH_QUERY_RANK = 'FAILURE_SEARCH_QUERY_RANK';

export function inputSearchQuery(query) {
  return {
    type: INPUT_SEARCH_QUERY,
    query,
  };
}

export function requestSearchQueryRank() {
  return {
    type: REQUEST_SEARCH_QUERY_RANK
  };
}