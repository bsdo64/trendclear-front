import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import PostActions from '../Actions/PostActions';
import CommunityActions from '../Actions/CommunityActions';
import { initListener, setMergeState } from './Helper/func';

class BestPostStore{
  constructor() {
    this.displayName = 'BestPostStore';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
    this.bindActions(CommunityActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onGetBestPost(response) {
    const normalizedPosts = response.results;
    const total = response.total;

    const oldResult = this.state.getIn(['posts', 'postList', 'result']);
    const newResult = oldResult.concat(normalizedPosts.result);

    const mergePosts = this.state.mergeDeep({posts: {postList: {entities: normalizedPosts.entities}}});
    const mergeResults = mergePosts.setIn(['posts', 'postList', 'result'], newResult);
    const mergeTotal = mergeResults.mergeDeep({posts: {collection: {total: total}}});

    if (normalizedPosts.result.length < 20) {
      const noMorePost = mergeTotal.set('noMore', true);
      this.setState(noMorePost);
    } else {
      const updateCollection = mergeTotal.updateIn(['posts', 'collection'], col =>
        col.merge({
          current_page: col.get('current_page') + 1,
          next_page: col.get('next_page') + 1
        })
      );
      this.setState(updateCollection);
    }
  }

  onResetBestPage() {
    const updateCollection = this.state.updateIn(['posts', 'collection'], col =>
      col.merge({
        current_page: 1,
        next_page: 2
      })
    );

    const updateNoMore = updateCollection.set('noMore', false);
    this.setState(updateNoMore);
  }

  onLikePost(postId) {
    if (postId) {
      const post = this.state.getIn(['posts', 'postList', 'entities', 'posts', postId+'']);

      if (post) {
        const countPost = this.state.updateIn(['posts', 'postList', 'entities', 'posts', postId+''], post =>
          post.mergeDeep({
            liked: true,
            like_count: post.get('like_count') + 1
          })
        );

        this.setState(countPost);
      }
    }
  }
}

export default alt.createStore(immutable(BestPostStore));
