import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

import assign from 'deep-assign';
import {normalize, arrayOf} from 'normalizr';
import {club, post, noti, forum} from '../Model/normalizr/schema';

import routes from './Routes';

if (process.env.NODE_ENV !== 'production') {

  window.Perf = require('react-addons-perf');

}

const ES6Promise = require('es6-promise');
ES6Promise.polyfill();

new Promise((resolve, reject) => {
  browserHistory.listen((location) => {
    "use strict";
    // 1. location에 따라 모든 Store 데이터를 가져온다
    // 2. 가져온 데이터를 각 Store에 삽입한다

    Api
      .setEntryPoint('/ajax')
      .get('/store' + location.pathname, location.query)
      .then(function CallStoreApi(resBody, errBody) {
        "use strict";

        if (resBody.BestPostStore && resBody.BestPostStore.posts) {
          const bestPostList = resBody.BestPostStore.posts.data;
          const bestPostListPagination = resBody.BestPostStore.posts.collection;

          const normalized = normalize(bestPostList, arrayOf(post));

          assign(resBody, {
            // Temp
            BestPostStore: {posts: {postList: normalized}},

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: {bestPostList: normalized.result},
            PaginationStore: {bestPostList: bestPostListPagination}
          });
        }

        if (resBody.ActivityStore && resBody.ActivityStore.posts) {
          const data = resBody.ActivityStore.posts.data;
          const collection = resBody.ActivityStore.posts.collection;

          const normalized = normalize(data, arrayOf(post));

          let context, type = resBody.ActivityStore.type;
          switch(type) {
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
            ActivityStore: {posts: {postList: normalized}},

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: {[context]: normalized.result},
            PaginationStore: {[context]: collection}
          });
        }

        if (resBody.SearchStore && resBody.SearchStore.search) {
          const searchPostList = resBody.SearchStore.search.posts.results;
          const searchPostListPagination = resBody.SearchStore.search.collection;

          const normalized = normalize(searchPostList, arrayOf(post));

          assign(resBody, {
            // Temp
            SearchStore: {search: {postList: normalized}},

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: {searchPostList: normalized.result},
            PaginationStore: {searchPostList: searchPostListPagination}
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.list) {
          const forumPostList = resBody.CommunityStore.list.data;
          const forumPostListPagination = resBody.CommunityStore.list.collection;

          const normalized = normalize(forumPostList, arrayOf(post));

          resBody.CommunityStore.list.postList = normalized;

          assign(resBody, {
            // Temp
            BestPostStore: {posts: {postList: normalized}},

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            Comments: normalized.entities.comments,
            SubComments: normalized.entities.subComments,
            ListStore: {forumPostList: normalized.result},
            PaginationStore: {forumPostList: forumPostListPagination}
          });
        }

        if (resBody.CommunityStore && resBody.CommunityStore.forum) {
          const forumData = resBody.CommunityStore.forum;

          const normalized = normalize(forumData, forum);

          resBody.CommunityStore.forum.IForum = normalized;

          assign(resBody, {
            Prefixes: normalized.entities.prefixes,
            Forums: normalized.entities.forums,
            ListStore: {
              prefixList: normalized.entities.forums[normalized.result].prefixes,
              forum: normalized.result
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

          const normalized = normalize(INCat, arrayOf(club));

          resBody.GnbStore.gnbMenu.INCat = normalized;

          assign(resBody, {
            Clubs: normalized.entities.clubs,
            Categories: normalized.entities.categories,
            CategoryGroups: normalized.entities.categoryGroups,
            Forums: normalized.entities.forums,
            ListStore: {ClubList: normalized.result}
          });
        }

        if (resBody.UserStore && resBody.UserStore.notifications) {
          const INoti = resBody.UserStore.notifications.data;

          const normalized = normalize(INoti, arrayOf(noti));

          resBody.UserStore.notifications.INoti = normalized;

          assign(resBody, {
            Notis: normalized.entities.notis,
            ListStore: {NotiList: normalized.result}
          });
        }

        if (process.env.NODE_ENV !== 'production') {
          console.info('Bootstrap Data : ', resBody);
        }

        alt.bootstrap(JSON.stringify(resBody));

        resolve();
      })
  })
})
.then(function () {
  "use strict";

  render(<Router routes={routes} history={browserHistory}/>, document.getElementById('app'));
});

require('./socketSubscribe');
