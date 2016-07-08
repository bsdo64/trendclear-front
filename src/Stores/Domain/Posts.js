import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import PostActions from '../../Actions/PostActions';
import GnbActions from '../../Actions/GnbActions';
import CommunityActions from '../../Actions/CommunityActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import GnbStore from '../../Stores/GnbStore';

class Posts {
  static displayName = 'Posts';
  constructor() {
    this.displayName = 'Posts';

    this.bindActions(AppActions);
    this.bindActions(PostActions);
    this.bindActions(GnbActions);
    this.bindActions(CommunityActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  
  onAddList(posts) {
    this.setMergeState(posts);
  }

  onLikePost(postId) {
    if (postId) {
      const newState = this.state.update(postId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });

      this.setState(newState);
    }
  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.merge(normalizedPosts.entities.posts);
    this.setState(newState);
  }

  onSaveFilter(response) {
    this.waitFor(GnbStore);

    if (response) {
      const normalizedPosts = response.results;
      const total = response.total;
      const limit = 10;

      const newState = this.state.merge(normalizedPosts.entities.posts);
      this.setState(newState);
    }
  }
}

export default alt.createStore(immutable(Posts), Posts.displayName);
