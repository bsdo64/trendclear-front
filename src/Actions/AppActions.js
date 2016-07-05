import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../Model/normalizr/schema';

import PostActions from './PostActions';
import CommentActions from './CommentActions';
import SubCommentActions from './SubCommentActions';
import UserActions from './UserActions';
import ListActions from './ListActions';
import GnbActions from './GnbActions';
import NotiActions from './NotiActions';
import PaginationActions from './PaginationActions';
import CommunityActions from './CommunityActions';

class AppActions {
  init(bootstrapData) {

    if (bootstrapData.BestPostStore && bootstrapData.BestPostStore.posts) {
      const bestPostList = bootstrapData.BestPostStore.posts.data;
      const bestPostListPagination = bootstrapData.BestPostStore.posts.collection;
      
      const normalized = normalize(bestPostList, arrayOf(post));

      bootstrapData.BestPostStore.posts.postList = normalized;

      bootstrapData.Posts = normalized.entities.posts;
      bootstrapData.Users = (normalized.entities.author);
      bootstrapData.PaginationStore = {bestPostList: bestPostListPagination};
      bootstrapData.ListStore = bootstrapData.ListStore || {};
      bootstrapData.ListStore.bestPostList = normalized.result;
    }

    if (bootstrapData.SearchStore && bootstrapData.SearchStore.search) {
      const searchPostList = bootstrapData.SearchStore.search.posts.results;
      const searchPostListPagination = bootstrapData.SearchStore.search.collection;
      bootstrapData.SearchStore.search.postList = normalize(searchPostList, arrayOf(post));

      const normalized = normalize(searchPostList, arrayOf(post));

      PostActions.addList(normalized.entities.posts);
      UserActions.addList(normalized.entities.author);
      PaginationActions.addPagination({searchPostList: searchPostListPagination});
      ListActions.add({searchPostList: normalized.result});
    }

    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.list) {
      const forumPostList = bootstrapData.CommunityStore.list.data;
      const forumPostListPagination = bootstrapData.CommunityStore.list.collection;
      bootstrapData.CommunityStore.list.postList = normalize(forumPostList, arrayOf(post));

      const normalized = normalize(forumPostList, arrayOf(post));

      PostActions.addList(normalized.entities.posts);
      UserActions.addList(normalized.entities.author);
      CommentActions.addList(normalized.entities.comments);
      SubCommentActions.addList(normalized.entities.subComments);
      PaginationActions.addPagination({forumPostList: forumPostListPagination});
      ListActions.add({forumPostList: normalized.result});
    }
    
    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.forum) {
      const prefixList = bootstrapData.CommunityStore.forum.prefixes;
      bootstrapData.CommunityStore.forum.prefixList = normalize(prefixList, arrayOf(prefix));

      const normalized = normalize(prefixList, arrayOf(prefix));

      CommunityActions.addPrefixes(normalized.entities.prefixes);
      ListActions.add({prefixList: normalized.result});
    }

    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.post) {
      const IPost = bootstrapData.CommunityStore.post;
      bootstrapData.CommunityStore.post.IPost = normalize(IPost, post);

      const normalized = normalize(IPost, post);
      
      PostActions.addList(normalized.entities.posts);
      UserActions.addList(normalized.entities.author);
      CommentActions.addList(normalized.entities.comments);
      SubCommentActions.addList(normalized.entities.subComments);
      ListActions.add({IPost: normalized.result});
    }

    if (bootstrapData.GnbStore && bootstrapData.GnbStore.gnbMenu) {
      const INCat = bootstrapData.GnbStore.gnbMenu.data;

      const normalized = normalize(INCat, arrayOf(club));

      bootstrapData.GnbStore.gnbMenu.INCat = normalized;

      bootstrapData.Clubs = (normalized.entities.clubs);
      bootstrapData.Categories = (normalized.entities.categories);
      bootstrapData.CategoryGroups = (normalized.entities.categoryGroups);
      bootstrapData.Forums = (normalized.entities.forums);
      bootstrapData.ListStore = bootstrapData.ListStore || {};
      bootstrapData.ListStore.ClubList = normalized.result;
    }

    if (bootstrapData.UserStore && bootstrapData.UserStore.notifications) {
      const INoti = bootstrapData.UserStore.notifications.data;

      const normalized = normalize(INoti, arrayOf(noti));

      bootstrapData.UserStore.notifications.INoti = normalized;

      bootstrapData.Notis = normalized.entities.notis;
      bootstrapData.ListStore = bootstrapData.ListStore || {};
      bootstrapData.ListStore.NotiList = normalized.result;
    }

    return bootstrapData;
  }
  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(AppActions);
