import { createSelector } from 'reselect';

const getClubs = state => state.getIn(['Domains', 'Forums']);
const getLists = state => state.getIn(['UI', 'List']);
const currentClubId = state => state.getIn(['UI', 'List', 'forum']);

export const getCurrentClub = createSelector(
  getClubs,
  currentClubId,
  (forums, clubId) => {

    return forums.get(clubId + '');
  },
);

export const getExploreMainClubs = createSelector(
  getLists,
  getClubs,
  (lists, clubs) => {
    const clubIds = lists.get('exploreMainClubs');
    return clubIds && clubIds.map(clubId => {
      return clubs.get(clubId + '')
    })
  }
);
