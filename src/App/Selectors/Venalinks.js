import { createSelector } from 'reselect';

export const getVenalinks = state => state.getIn(['Domains', 'Venalinks']);
const getList = state => state.getIn(['UI', 'List']);

export const getUserVenalinks = createSelector(
  getList,
  getVenalinks,
  (list, venalinks) => {
    const venalinkIds = list.get('userVenalinks');

    return venalinkIds && venalinkIds.map((venalinkId) => {
      return venalinks.get(venalinkId + '');
    });
  },
);
