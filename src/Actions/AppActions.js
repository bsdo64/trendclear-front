import alt from '../Utils/alt';
import {normalize, arrayOf} from 'normalizr';
import {post, prefix, comment} from './normalizr/schema';

class AppActions {
  init(bootstrapData) {

    if (bootstrapData.BestPostStore && bootstrapData.BestPostStore.posts) {
      const bestPostList = bootstrapData.BestPostStore.posts.data;
      bootstrapData.BestPostStore.posts.postList = normalize(bestPostList, arrayOf(post));
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

    return bootstrapData;
  }
  openSideCategory(clubId) {
    return clubId;
  }
}

module.exports = alt.createActions(AppActions);
