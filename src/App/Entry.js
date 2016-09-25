import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

import assign from 'deep-assign';
import {normalize, arrayOf} from 'normalizr';
import {author, category, post, noti, forum} from '../Model/normalizr/schema';

import Router from './Routes';

if (process.env.NODE_ENV !== 'production') {

  window.Perf = require('react-addons-perf');

}

require('core-js');

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

        if (resBody.UserStore && resBody.UserStore.user) {
          const User = resBody.UserStore.user;
          const userInfo = Object.assign(User, {
            trendbox: resBody.UserStore.trendbox,
            profile: resBody.UserStore.profile,
            grade: resBody.UserStore.grade,
            role: resBody.UserStore.role,
            notifications: resBody.UserStore.notifications,
            skills: resBody.UserStore.skills,
            collections: resBody.UserStore.collections,
            follow_forums: resBody.UserStore.follow_forums,
            forumCreated: resBody.UserStore.forumCreated,
          });

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
            CollectionBestPostStore: {posts: {postList: normalized}},

            Posts: normalized.entities.posts,
            Users: normalized.entities.author,
            ListStore: {collectionBestPostList: normalized.result},
            PaginationStore: {collectionBestPostList: collectionBestPostListPagination}
          });
        }

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

          const searchForumList = resBody.SearchStore.forum.data.results;
          const searchForumListPagination = resBody.SearchStore.forum.collection;

          const normalizedForums = normalize(searchForumList, arrayOf(forum));

          assign(resBody, {
            // Temp

            Forums: normalizedForums.entities.forums,
            Users: normalizedForums.entities.author,
            ListStore: {searchForumList: normalizedForums.result},
            PaginationStore: {searchForumList: searchForumListPagination}
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
            ListStore: {CategoryList: normalized.result}
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

        if (resBody.ForumSettingStore && resBody.ForumSettingStore.content) {

          resBody.ForumSettingStore.forum = resBody.CommunityStore.forum;
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

  render(Router(), document.getElementById('app'));
});

require('./socketSubscribe');
