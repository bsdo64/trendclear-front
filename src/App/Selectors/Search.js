import { createSelector } from 'reselect';

export const getGlobalSearch = state => state.getIn(['UI', 'Search']);

export const getSearch = createSelector(
  getGlobalSearch,
  SearchState => SearchState,
);

export const getSearchQueryRankList = createSelector(
  [getGlobalSearch],
  SearchState => SearchState.get('queryRankList')
);
