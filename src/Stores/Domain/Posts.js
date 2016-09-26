import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import PostActions from '../../Actions/PostActions';
import DeleteActions from '../../Actions/DeleteActions';
import GnbActions from '../../Actions/GnbActions';
import CommunityActions from '../../Actions/CommunityActions';
import CommentActions from '../../Actions/CommentActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import GnbStore from '../../Stores/GnbStore';

class Posts {
  static displayName = 'Posts';
  constructor() {
    this.displayName = 'Posts';

    this.bindActions(PostActions);
    this.bindActions(DeleteActions);
    this.bindActions(GnbActions);
    this.bindActions(CommunityActions);
    this.bindActions(CommentActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
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

  onGetSearchPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.posts);
    this.setState(newState);
  }

  onGetBestPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.posts);
    this.setState(newState);
  }

  onGetMoreMyPost(response) {
    const normalizedPosts = response.data;

    const newState = this.state.mergeDeep(normalizedPosts.entities.posts);
    this.setState(newState);
  }

  onSaveFilter(res) {
    if (res.data) {
      const normalizedPosts = res.data;
      const newState = this.state.mergeDeep(normalizedPosts.entities.posts);
      this.setState(newState);
    }
  }
  
  onSubmitComment(IPost) {

    let addCommentState = this.state.mergeDeep(IPost.entities.posts);
    this.setMergeState(addCommentState);
  }

  onDelete(deletedItem) {

    if (deletedItem.id && !deletedItem.comment_id) {
      let deletedPosts = this.state.updateIn([deletedItem.id.toString(), 'deleted'], v => true);
      this.setState(deletedPosts);
    }
  }
}

export default alt.createStore(immutable(Posts), Posts.displayName);
