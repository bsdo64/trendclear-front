import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const getForums = state => state.getIn(['Domains', 'Forums']);
const getCollections = state => state.getIn(['Domains', 'Collections']);
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
