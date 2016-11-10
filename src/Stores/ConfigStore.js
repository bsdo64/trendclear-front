import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import RouterReducer from '../Reducers/RouteReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import Stores from '../Reducers';
import Api from '../Utils/ApiClient';

import assign from 'deep-assign';
import {normalize, arrayOf} from 'normalizr';
import {author, category, post, noti, forum} from '../Model/normalizr/schema';


const initRouteState = store => dispatch => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {

    const location = action.payload;

    return Api
      .setEntryPoint('/ajax')
      .get('/store' + location.pathname, location.query)
      .then(function CallStoreApi(resBody, errBody) {

        if (resBody.UserStore && resBody.UserStore.user) {
          const User = resBody.UserStore.user;
          const UserStore = resBody.UserStore;
          const userInfo = {
            ...UserStore,
            ...User
          };

          const normalized = normalize(userInfo, author);

          assign(resBody, {
            Users: normalized.entities.author,
            Collections: normalized.entities.collections,
            Forums: normalized.entities.forums,
          });
        }

        if (resBody.CollectionBestPostStore && resBody.CollectionBestPostStore.posts) {
          const collectionBestPostList = resBody.CollectionBestPostStore.posts.data;
          const collectionBestPostListPagination = resBody.CollectionBestPostStore.posts.collection;

          const normalized = normalize(collectionBestPostList, arrayOf(post));

          assign(resBody, {
            // Temp
            CollectionBestPostStore: { posts: { postList: normalized } },

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { collectionBestPostList: normalized.result },
            PaginationStore: { collectionBestPostList: collectionBestPostListPagination }
          });
        }

        if (resBody.BestPostStore && resBody.BestPostStore.posts) {
          const bestPostList = resBody.BestPostStore.posts.data;
          const bestPostListPagination = resBody.BestPostStore.posts.collection;

          const normalized = normalize(bestPostList, arrayOf(post));

          assign(resBody, {
            // Temp
            BestPostStore: { posts: { postList: normalized } },

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { bestPostList: normalized.result },
            PaginationStore: { bestPostList: bestPostListPagination }
          });
        }

        if (resBody.ActivityStore && resBody.ActivityStore.posts) {
          const data = resBody.ActivityStore.posts.data;
          const collection = resBody.ActivityStore.posts.collection;

          const normalized = normalize(data, arrayOf(post));

          let context, type = resBody.ActivityStore.type;
          switch (type) {
            case 'likePostList':
              context = 'likePostList';
              break;

            case 'myWritePostList':
              context = 'myWritePostList';
              break;

            case 'myWriteCommentPostList':
              context = 'myWriteCommentPostList';
              break;

            default:
              context = 'likePostList';
          }

          assign(resBody, {
            // Temp
            ActivityStore: { posts: { postList: normalized } },

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { [context]: normalized.result },
            PaginationStore: { [context]: collection }
          });
        }

        if (resBody.SearchStore && resBody.SearchStore.search) {
          const searchPostList = resBody.SearchStore.search.posts.results;
          const searchPostListPagination = resBody.SearchStore.search.collection;

          const normalized = normalize(searchPostList, arrayOf(post));

          assign(resBody, {
            // Temp
            SearchStore: { search: { postList: normalized } },

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { searchPostList: normalized.result },
            PaginationStore: { searchPostList: searchPostListPagination }
          });

          const searchForumList = resBody.SearchStore.forum.data.results;
          const searchForumListPagination = resBody.SearchStore.forum.collection;

          const normalizedForums = normalize(searchForumList, arrayOf(forum));

          assign(resBody, {
            // Temp

            Forums: normalizedForums.entities.forums,
            Users: normalizedForums.entities.author,
            ListStore: { searchForumList: normalizedForums.result },
            PaginationStore: { searchForumList: searchForumListPagination }
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.list) {
          const forumPostList = resBody.CommunityStore.list.data;
          const forumPostListPagination = resBody.CommunityStore.list.collection;

          const normalized = normalize(forumPostList, arrayOf(post));

          resBody.CommunityStore.list.postList = normalized;

          assign(resBody, {
            // Temp
            BestPostStore: { posts: { postList: normalized } },

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            Comments: normalized.entities.comments,
            SubComments: normalized.entities.subComments,
            ListStore: { forumPostList: normalized.result },
            PaginationStore: { forumPostList: forumPostListPagination }
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.forum) {
          const forumData = resBody.CommunityStore.forum;

          const normalized = normalize(forumData, forum);

          resBody.CommunityStore.forum.IForum = normalized;

          assign(resBody, {
            Prefixes: normalized.entities.prefixes,
            Forums: normalized.entities.forums,
            Users: normalized.entities.author,
            Posts: normalized.entities.posts,
            ListStore: {
              prefixList: normalized.entities.forums[normalized.result].prefixes,
              forum: normalized.result,
              announcesList: normalized.entities.announces,
              managersList: normalized.entities.managers,
              banUserList: normalized.entities.banUserList
            }
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.post) {
          const IPost = resBody.CommunityStore.post;

          const normalized = normalize(IPost, post);

          resBody.CommunityStore.post.IPost = normalized;

          assign(resBody, {
            Prefixes: normalized.entities.prefixes,
            Forums: normalized.entities.forums,
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            Comments: normalized.entities.comments,
            SubComments: normalized.entities.subComments,

            ListStore: {
              IPost: normalized.result
            }
          });
        }

        if (resBody.GnbStore && resBody.GnbStore.gnbMenu) {
          const INCat = resBody.GnbStore.gnbMenu.data;

          const normalized = normalize(INCat, arrayOf(category));

          resBody.GnbStore.gnbMenu.INCat = normalized;

          assign(resBody, {
            Categories: normalized.entities.categories,
            Forums: normalized.entities.forums,
            ListStore: { CategoryList: normalized.result }
          });
        }

        if (resBody.UserStore && resBody.UserStore.notifications) {
          const INoti = resBody.UserStore.notifications.data;

          const normalized = normalize(INoti, arrayOf(noti));

          resBody.UserStore.notifications.INoti = normalized;

          assign(resBody, {
            Notis: normalized.entities.notis,
            ListStore: { NotiList: normalized.result }
          });
        }

        if (resBody.ForumSettingStore && resBody.ForumSettingStore.content) {

          resBody.ForumSettingStore.forum = resBody.CommunityStore.forum;
        }

        if (process.env.NODE_ENV !== 'production') {
          console.info('Bootstrap Data : ', resBody);
        }

        const state = {
          UI: {
            Auth: resBody.AuthStore,
            ForumSetting: resBody.ForumSettingStore,
            Gnb: resBody.GnbStore,
            Community: resBody.CommunityStore,
            Submit: resBody.SubmitStore,
            ShareLink: resBody.ShareLinkStore,
            Shopping: resBody.ShoppingStore,
            RemoveModal: resBody.RemoveModalStore,
            Report: resBody.ReportStore,
            Modal: resBody.ModalStore,
            ResetPassword: resBody.ResetPasswordStore,
            Activity: resBody.ActivityStore,
            SubmitForum: resBody.SubmitForumStore,
            Pagination: resBody.PaginationStore,
            SigninForm: resBody.SigninFormStore,
            Search: resBody.SearchStore,
            Login: resBody.LoginStore,
            List: resBody.ListStore,
          },
          Domains: {
            Users: resBody.Users,
            Forums: resBody.Forums,
            Collections: resBody.Collections,
            Posts: resBody.Posts,
            Comments: resBody.Comments,
            SubComments: resBody.SubComments,
            Categories: resBody.Categories,
            Notis: resBody.Notis,
            Prefixes: resBody.Prefixes
          }
        };

        action.serverInitData = state;
        return dispatch(action);
      });
  } else {
    return dispatch(action);
  }
};

export default (initialImmutableState) => {
  return createStore(
    combineReducers({
      Stores,
      routing: RouterReducer
    }),
    initialImmutableState,
    composeWithDevTools(
      applyMiddleware(
        initRouteState,
        thunk,
      )
    )
  );
}
