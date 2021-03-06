import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import RouterReducer from './Reducers/RouteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import Stores from './Reducers';
import Api from '../Utils/ApiClient';
import assign from 'deep-assign';
import deepMerge from 'deepmerge';
import { normalize } from 'normalizr';
import * as schema from '../Model/normalizr/schema';
import { author, category, post, noti, forum } from '../Model/normalizr/schema';

let bootStrapLogger;
if (process.env.NODE_ENV !== 'production') {
  bootStrapLogger = require('debug')('vn:api:Bootstrap');
}

function clean(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

const initRouteState = (/* store */) => dispatch => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {

    const location = action.payload;

    return Api
      .setEntryPoint('/ajax')
      .get('/store' + location.pathname, location.search)
      .then(function CallStoreApi(resBody, errBody) {

        if (errBody) {
          return;
        }

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
            Inventories: normalized.entities.inventories,
            Venatems: normalized.entities.venatems,
            Items: normalized.entities.items,
            Participants: normalized.entities.participants,
            ParticipatedVenalinks: normalized.entities.participatedVenalinks,
          });
        }

        if (resBody.CollectionBestPostStore && resBody.CollectionBestPostStore.posts) {
          const collectionBestPostList = resBody.CollectionBestPostStore.posts.data;
          const collectionBestPostListPagination = resBody.CollectionBestPostStore.posts.collection;

          const normalized = normalize(collectionBestPostList, [post]);

          assign(resBody, {
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: {
              collectionBestPostList: normalized.result,
              collection: resBody.CollectionBestPostStore.collection
            },
            PaginationStore: { collectionBestPostList: collectionBestPostListPagination },
          });
        }

        if (resBody.BestPostStore && resBody.BestPostStore.posts) {
          const bestPostList = resBody.BestPostStore.posts.data;
          const bestPostListPagination = resBody.BestPostStore.posts.collection;

          const normalized = normalize(bestPostList, [post]);

          assign(resBody, {
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { bestPostList: normalized.result },
            PaginationStore: { bestPostList: bestPostListPagination },
          });
        }

        if (resBody.ActivityStore && resBody.ActivityStore.posts) {
          const data = resBody.ActivityStore.posts.data;
          const collection = resBody.ActivityStore.posts.collection;

          const normalized = normalize(data, [post]);

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
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { [context]: normalized.result },
            PaginationStore: { [context]: collection },
          });
        }

        if (resBody.SearchStore && resBody.SearchStore.search) {
          const searchPostList = resBody.SearchStore.search.posts.results;
          const searchPostListPagination = resBody.SearchStore.search.collection;

          const normalized = normalize(searchPostList, [post]);

          assign(resBody, {
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: { searchPostList: normalized.result },
            PaginationStore: { searchPostList: searchPostListPagination },
          });

          const searchForumList = resBody.SearchStore.forum.data.results;
          const searchForumListPagination = resBody.SearchStore.forum.collection;

          const normalizedForums = normalize(searchForumList, [forum]);

          assign(resBody, {
            Forums: normalizedForums.entities.forums,
            Users: normalizedForums.entities.author,
            ListStore: { searchForumList: normalizedForums.result },
            PaginationStore: { searchForumList: searchForumListPagination },
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.list) {
          const forumPostList = resBody.CommunityStore.list.data;
          const forumPostListPagination = resBody.CommunityStore.list.collection;

          const normalized = normalize(forumPostList, [post]);

          assign(resBody, {
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            Comments: normalized.entities.comments,
            SubComments: normalized.entities.subComments,
            ListStore: { forumPostList: normalized.result },
            PaginationStore: { forumPostList: forumPostListPagination },
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.forum) {
          const forumData = resBody.CommunityStore.forum;

          const normalized = normalize(forumData, forum);

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
              banUserList: normalized.entities.banUserList,
            },
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.post) {
          const Post = resBody.CommunityStore.post;

          const normalized = normalize(Post, post);

          assign(resBody, {
            Prefixes: normalized.entities.prefixes,
            Forums: normalized.entities.forums,
            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            Comments: normalized.entities.comments,
            SubComments: normalized.entities.subComments,

            ListStore: {
              CurrentPostId: normalized.result,
            },
          });
        }

        if (resBody.UserStore && resBody.UserStore.notifications) {
          const INoti = resBody.UserStore.notifications.data;
          const normalized = normalize(INoti, [noti]);
          resBody.UserStore.notifications.INoti = normalized;

          assign(resBody, {
            Notis: normalized.entities.notis,
            ListStore: { NotiList: normalized.result },
          });
        }

        if (resBody.ForumSettingStore && resBody.ForumSettingStore.content) {
          resBody.ForumSettingStore.forum = resBody.CommunityStore.forum;
        }

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function createDomainEntities (entities) {
          const schemaMap = {
            Author: 'Users',
          };
          const result = {};

          for (let prop in entities) {
            let schemaName = capitalizeFirstLetter(prop);
            if (schemaMap[schemaName]) {
              schemaName = schemaMap[schemaName];
            }

            result[schemaName] = entities[prop];
          }

          return result;
        }

        if (resBody.listStores) {

          if (resBody.listStores.lists) {
            for (let i = 0; i < resBody.listStores.lists.length; i++) {
              const list = resBody.listStores.lists[i];
              const normalized = normalize(list.data.results, [schema[list.itemSchema]]);
              const schemaEntities = createDomainEntities(normalized.entities);

              resBody = deepMerge.all([resBody, schemaEntities, {
                ListStore: { [list.listName]: normalized.result },
                PaginationStore: { [list.listName]: list.collection },
              }]);
            }
          }
        }

        const state = {
          UI: {
            Auth: resBody.AuthStore,
            ForumSetting: resBody.ForumSettingStore,
            Gnb: resBody.GnbStore,
            Community: resBody.CommunityStore,
            SubmitPost: resBody.SubmitPostStore,
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
            UserSetting: resBody.UserSettingStore,
            Login: resBody.LoginStore,
            List: resBody.ListStore,
            ErrorPage: resBody.ErrorPageStore
          },
          Domains: {
            Users: resBody.Users,
            Inventories: resBody.Inventories,
            Items: resBody.Items,
            Venatems: resBody.Venatems,
            Forums: resBody.Forums,
            Collections: resBody.Collections,
            Posts: resBody.Posts,
            Comments: resBody.Comments,
            SubComments: resBody.SubComments,
            Categories: resBody.Categories,
            Notis: resBody.Notis,
            Prefixes: resBody.Prefixes,
            Venalinks: resBody.Venalinks,
            ParticipatedVenalinks: resBody.ParticipatedVenalinks,
            Participants: resBody.Participants,
          },
        };

        clean(state.UI);
        clean(state.Domains);

        action.serverInitData = state;

        if (process.env.NODE_ENV !== 'production') {
          bootStrapLogger(resBody);
        }

        return dispatch(action);
      })
      .catch(e => {
        console.log(e);
      })
  } else {
    return dispatch(action);
  }
};

export default (initialImmutableState, sagaMiddleware) => {
  let middleWareWrapper;
  if (process.env.NODE_ENV !== 'production') {
    middleWareWrapper = composeWithDevTools(
      applyMiddleware(
        initRouteState,
        thunk,
        sagaMiddleware,
      ),
    );
  } else {
    middleWareWrapper = applyMiddleware(
      initRouteState,
      thunk,
      sagaMiddleware,
    );
  }

  return createStore(
    combineReducers({
      Stores,
      routing: RouterReducer,
    }),
    initialImmutableState,
    middleWareWrapper,
  );
};
