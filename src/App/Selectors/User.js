import { createSelector } from 'reselect';
import { List } from 'immutable';

const getCurrentUserId = state => state.getIn(['UI', 'Auth', 'userId']);

const getUsers = state => state.getIn(['Domains', 'Users']);
const getForums = state => state.getIn(['Domains', 'Forums']);

export const getUser = createSelector(
  [getCurrentUserId, getUsers],
  (currentUserId, users) => {
    return users.get(currentUserId + '');
  }
);

export const forumFollowed = createSelector(
  [getForums, getUser],
  (forums, user) => {
    if (!user) {
      return new List([]);
    }

    const ForumIds = user.get('follow_forums');

    return ForumIds.map((forumId) => {
      return forums.get(forumId + '');
    });
  }
);

export const forumCreated = createSelector(
  [getForums, getUser],
  (forums, user) => {
    if (!user) {
      return new List([]);
    }

    const ForumIds = user.get('forumCreated');

    return ForumIds.map((forumId) => {
      return forums.get(forumId + '');
    });
  }
);
