import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import CommentActions from '../Actions/CommentActions';

import SubmitStore from './SubmitStore';
import CommunityStore from './CommunityStore';

import { initListener, setMergeState, locationHref } from './Helper/func';

class UserStore{
  constructor() {
    this.displayName = 'UserStore';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
    this.bindActions(PostActions);

    this.bindActions(CommentActions);

    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onRequestLogout(result) {
    if (result === 'ok') {
      
      locationHref('/');
    }
  }

  onIncreaseLevel() {
    this.waitFor(SubmitStore);

    let state = this.state.updateIn(['trendbox', 'level'], val => val + 1);
    this.setMergeState(state);
  }

  onOpenAvatarModalOpen() {
    let state = Map({ openAvatarModal: true });
    this.setMergeState(state);
  }

  onCloseAvatarModal() {
    let state = Map({ openAvatarModal: false });
    this.setMergeState(state);
  }

  onUploadAvatarImage(result) {
    if (result && result.files[0]) {
      const file = result.files[0];
      let state = this.state.setIn(['profile', 'avatar_img'], file.name);
      let closeModal = state.set('openAvatarModal', false);
      this.setMergeState(closeModal);
    }
  }

  onLevelUp(newTrendbox) {
    let state = this.state.set('trendbox', newTrendbox);

    console.log(state);
    this.setMergeState(state.toJS());
  }

  onSubmitComment() {
    this.waitFor(CommunityStore);

    let state = this.state.toJS();
    state.skills.map((value, key) => {
      if (value.skill.name === 'write_comment') {
        return value.using_at = new Date();
      }
    });

    this.setMergeState(state);
  }

  onSubmitSubComment() {
    this.waitFor(CommunityStore);

    let state = this.state.toJS();
    state.skills.map((value, key) => {
      if (value.skill.name === 'write_sub_comment') {
        return value.using_at = new Date();
      }
    });

    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(UserStore));
