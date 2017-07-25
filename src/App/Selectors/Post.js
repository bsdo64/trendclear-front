import { createSelector } from 'reselect';
import { getUsers } from './User'

export const getCommunity = state => state.getIn(['UI', 'Community']);
export const getPosts = state => state.getIn(['Domains', 'Posts']);
export const getForums = state => state.getIn(['Domains', 'Forums']);
export const getLists = state => state.getIn(['UI', 'List']);

export const getCurrentFocusPostAuthor = createSelector(
  getCommunity,
  getUsers,
  getPosts,
  (community, users, posts) => {
    const postId = community.get('postId');
    const authorId = community.get('authorId');
    const post = posts.get(postId);

    return users.get(authorId + '') || null;
  }
);

export const getExploreMainPost = createSelector(
  getLists,
  getPosts,
  getForums,
  (lists, posts, forums) => {
    const postIds = lists.get('exploreMainPosts');

    return postIds && postIds.map((postId) => {
      return posts.get(postId + '');
    });
  }
);
