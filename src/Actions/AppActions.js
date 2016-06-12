import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from './normalizr/schema';

class AppActions {
  init(bootstrapData) {

    if (bootstrapData.BestPostStore && bootstrapData.BestPostStore.posts) {
      const bestPostList = bootstrapData.BestPostStore.posts.data;
      bootstrapData.BestPostStore.posts.postList = normalize(bestPostList, arrayOf(post));
    }

    if (bootstrapData.SearchStore && bootstrapData.SearchStore.search) {
      const searchPostList = bootstrapData.SearchStore.search.posts.results;
      bootstrapData.SearchStore.search.postList = normalize(searchPostList, arrayOf(post));
    }

    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.list) {
      const forumPostList = bootstrapData.CommunityStore.list.data;
      bootstrapData.CommunityStore.list.postList = normalize(forumPostList, arrayOf(post));
    }
    
    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.forum) {
      const prefixList = bootstrapData.CommunityStore.forum.prefixes;
      bootstrapData.CommunityStore.forum.prefixList = normalize(prefixList, arrayOf(prefix));
    }

    if (bootstrapData.CommunityStore && bootstrapData.CommunityStore.post) {
      const IPost = bootstrapData.CommunityStore.post;
      bootstrapData.CommunityStore.post.IPost = normalize(IPost, post);
    }


    if (bootstrapData.GnbStore && bootstrapData.GnbStore.gnbMenu) {
      const INCat = bootstrapData.GnbStore.gnbMenu.data;
      bootstrapData.GnbStore.gnbMenu.INCat = normalize(INCat, arrayOf(club));
    }

    if (bootstrapData.UserStore && bootstrapData.UserStore.notifications) {
      const INoti = bootstrapData.UserStore.notifications.data;
      bootstrapData.UserStore.notifications.INoti = normalize(INoti, arrayOf(noti));
    }

    return bootstrapData;
  }
  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(AppActions);
