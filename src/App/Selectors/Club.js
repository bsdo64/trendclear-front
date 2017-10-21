import { createSelector } from 'reselect';
import { CLUB_NOT_EXIST } from '../Constants/ErrorCodes';

const getClubs = state => state.getIn(['Domains', 'Forums']);
const getLists = state => state.getIn(['UI', 'List']);
const getErrorPage = state => state.getIn(['UI', 'ErrorPage']);
const currentClubId = state => state.getIn(['UI', 'List', 'forum']);

export const getCurrentClub = createSelector(
  getClubs,
  currentClubId,
  getErrorPage,
  (forums, clubId, errorPage) => {

    if (!clubId && errorPage.get('errorCode') === CLUB_NOT_EXIST) {
      return errorPage;
    }

    return forums.get(clubId + '');
  },
);

export const getExploreClubs = createSelector(
  getLists,
  getClubs,
  (lists, clubs) => {
    const clubIds = lists.get('exploreClubs');
    return clubIds && clubIds.map(clubId => {
      return clubs.get(clubId + '');
    });
  }
);

export const getExploreMainClubs = createSelector(
  getLists,
  getClubs,
  (lists, clubs) => {
    const clubIds = lists.get('exploreMainClubs');
    return clubIds && clubIds.map(clubId => {
      return clubs.get(clubId + '');
    });
  }
);
