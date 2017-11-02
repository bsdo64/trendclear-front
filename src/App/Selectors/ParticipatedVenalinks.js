import { createSelector } from 'reselect';

import { getVenalinks } from './Venalinks';

export const getParticipated = state => state.getIn(['Domains', 'ParticipatedVenalinks']);
const getList = state => state.getIn(['UI', 'List']);

export const getUserParticipatedVenalinks = createSelector(
  getList,
  getParticipated,
  getVenalinks,
  (list, participatedVenalinks, venalinks) => {
    const pIds = list.get('userParticipatedVenalinks');

    return pIds && pIds.map((pId) => {
      const participated = participatedVenalinks.get(pId + '');
      const vId = participated.get('venalink');
      return participated.set('venalink', venalinks.get(vId + ''));
    });
  },
);
