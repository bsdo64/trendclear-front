import { createSelector } from 'reselect';
import { List } from 'immutable';


const getCurrentUserId = state => state.getIn(['UI', 'Auth', 'userId']);
const getPaymentId = state => state.getIn(['UI', 'ChargePoint', 'paymentId']);
export const getUsers = state => state.getIn(['Domains', 'Users']);
const getForums = state => state.getIn(['Domains', 'Forums']);
const getCollections = state => state.getIn(['Domains', 'Collections']);

export const getUser = createSelector(
  [getCurrentUserId, getUsers],
  (currentUserId, users = new List([])) => {
    return users.get(currentUserId + '') ;
  },
);

export const forumFollowed = createSelector(
  [getForums, getUser],
  (forums, user) => {
    if (!user) {
      return forums;
    }

    const ForumIds = user.get('follow_forums');

    return ForumIds.map((forumId) => {
      return forums.get(forumId + '');
    });
  },
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
  },
);

export const getForumManaged = createSelector(
  getUser,
  getForums,
  (user, forums) => {
    if (user) {
      const userForumManageIdList = user.get('forumManaged');

      return userForumManageIdList.map(v => {
        return forums.get(v + '');
      });
    } else {
      return new List();
    }
  }
);

export const getCollectionList = createSelector(
  getUser,
  getCollections,
  (user, collections) => {
    if (user) {
      const userCollectionIdList = user.get('collections');

      return userCollectionIdList.map(v => {
        return collections.get(v + '');
      });
    } else {
      return new List();
    }
  },
);

export const getPaymentInfo = createSelector(
  getUser,
  getPaymentId,
  (user, paymentId) => {
    if (user) {
      const payments = user.getIn(['payments', 'results']);
      return payments && payments
        .filter(v => v.get('id') === paymentId)
        .get(0);
    } else {
      return null;
    }
  }
);

export const getLatestSeenList = createSelector(
  getUser,
  (user) => {
    if (user) {
      return user.get('latestSeen')
    } else {
      return new List();
    }
  }
);