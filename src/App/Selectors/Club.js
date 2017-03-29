import { createSelector } from 'reselect';

const getClubs = state => state.getIn(['Domains', 'Forums']);
const currentClubId = state => state.getIn(['UI', 'List', 'forum']);

export const getCurrentClub = createSelector(
  getClubs,
  currentClubId,
  (forums, clubId) => {

    return forums.get(clubId + '');
  },
);
