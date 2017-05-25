import { createSelector } from 'reselect';
import { getUsers } from './User'

export const getCommunity = state => state.getIn(['UI', 'Community']);
export const getPosts = state => state.getIn(['Domains', 'Posts']);

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