import alt from '../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../Actions/GnbActions';
import CommentActions from '../Actions/CommentActions';
import CommunityActions from '../Actions/CommunityActions';
import PostActions from '../Actions/PostActions';
import { initListener, setMergeState } from './Helper/func';

class CommunityStore {
  static get displayName() { return 'CommunityStore' }

  constructor() {
    this.displayName = 'CommunityStore';

    this.bindActions(GnbActions);
    this.bindActions(CommentActions);
    this.bindActions(PostActions);
    this.bindActions(CommunityActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onResetData() {
    this.setState(Map({}));
  }

  onTriggerUpdate(targetObj) {
    const newState = this.state.merge({
      updateId: targetObj.targetId,
      updateType: targetObj.type,
      updating: true
    });

    this.setState(newState);
  }

  onUpdateComment(comment) {
    if (comment && comment.result) {
      const newState = this.state.merge({
        updateId: null,
        updateType: null,
        updating: false
      });

      this.setState(newState);
    }
  }

  onUpdateSubComment(comment) {
    if (comment && comment.result) {
      const newState = this.state.merge({
        updateId: null,
        updateType: null,
        updating: false
      });

      this.setState(newState);
    }
  }

  onCloseUpdateComment(close) {
    if (close) {
      const newState = this.state.merge({
        updateId: null,
        updateType: null,
        updating: false
      });

      this.setState(newState);
    }
  }

}

export default alt.createStore(immutable(CommunityStore), CommunityStore.displayName);
