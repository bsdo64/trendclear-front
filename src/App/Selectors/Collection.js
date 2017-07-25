import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const getForums = state => state.getIn(['Domains', 'Forums']);
const getUsers = state => state.getIn(['Domains', 'Users']);
const getCollections = state => state.getIn(['Domains', 'Collections']);
const getList = state => state.getIn(['UI', 'List']);
const getCurrentCollectionId = state => state.getIn(['UI', 'List', 'collection', 'id']);

export const getCurrentCollection = createSelector(
  [getCurrentCollectionId, getCollections],
  (collectionId, collections) => {
    return collections.get(collectionId + '') || Map();
  }
);

export const getSubscribingForumList = createSelector(
  [getCurrentCollection, getForums],
  (collection, forums) => {
    const subscribingForumIds = collection && collection.get('forums') || List([]);

    return subscribingForumIds.map((forumId) => {
      return forums.get(forumId + '');
    });
  },
);

export const getExploreMainCollections = createSelector(
  getList,
  getCollections,
  getForums,
  (lists, collections, clubs) => {
    const collectionIds = lists.get('exploreMainCollections');

    return collectionIds && collectionIds.map(collectionId => {
      return collections.get(collectionId + '').withMutations(c => {
        const forumIds = c.get('forums');
        const forums = forumIds.map(fId => {
          return clubs.get(fId + '');
        });


        c.set('forums', forums);
      })
    })
  }
);
