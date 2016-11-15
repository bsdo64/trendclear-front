import alt from '../../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import PostActions from '../../Actions/PostActions';
import DeleteActions from '../../Actions/DeleteActions';
import GnbActions from '../../Actions/GnbActions';
import CommunityActions from '../../Actions/CommunityActions';
import CommentActions from '../../Actions/CommentActions';
import VenaStoreActions from '../../Actions/VenaStoreActions';
import { initListener, setMergeState } from '../Helper/func';

class Posts {
  static displayName = 'Posts';

  constructor() {
    this.displayName = 'Posts';

    this.bindActions(PostActions);
    this.bindActions(DeleteActions);
    this.bindActions(GnbActions);
    this.bindActions(CommunityActions);
    this.bindActions(CommentActions);
    this.bindActions(VenaStoreActions);
    this.state = Immutable.Map({});

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

  onSubmitComment(normalized) {

    let addCommentState = this.state.mergeDeep(normalized.entities.posts);
    this.setMergeState(addCommentState);
  }

  onDelete(deletedItem) {

    if (deletedItem.id && !deletedItem.comment_id) {
      let deletedPosts = this.state.updateIn([deletedItem.id.toString(), 'deleted'], v => true);
      this.setState(deletedPosts);
    }
  }

  onRequestActivateVenalink(result) {
    if (result.success) {
      let newPosts = this.state.updateIn([result.venalink.post_id.toString(), 'venalinks'], v => v.push(Map(result.venalink)));
      this.setState(newPosts);
    }
  }
}

export default alt.createStore(immutable(Posts), Posts.displayName);
