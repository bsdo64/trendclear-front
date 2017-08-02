import { createSelector } from 'reselect';

const getClubs = state => state.getIn(['Domains', 'Forums']);
const getLists = state => state.getIn(['UI', 'List']);
const getPagination = state => state.getIn(['UI', 'Pagination']);

export const getCollection = (listName) => {
  return createSelector(
    getPagination,
    (pagination) => {
      return pagination.get(listName)
    },
  );
};
