import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../Actions/UserActions';
import PostActions from '../Actions/PostActions';
import CommentActions from '../Actions/CommentActions';

import SettingStore from './SettingStore';
import SubmitStore from './SubmitStore';
import CommunityStore from './CommunityStore';

import { initListener, setMergeState, locationHref } from './Helper/func';

class UserStore{
  static displayName = 'UserStore';
  
  constructor() {

    this.bindActions(UserActions);
    this.bindActions(PostActions);

    this.bindActions(CommentActions);

    this.state = Immutable.fromJS({
      user: null,
      trendbox: null,
      profile: {
        avatar_img: null,
        sex: null
      }
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onRequestLogout(result) {
    if (result === 'ok') {
      
      locationHref('/');
    }
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
    if (result.file && result.file.files[0]) {
      let closeModal = this.state.set('openAvatarModal', false);
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
        value.using_at = new Date();
      }
    });

    state.trendbox.exp = state.trendbox.exp + 5;
    state.trendbox.T = state.trendbox.T + 10;

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

    state.trendbox.exp = state.trendbox.exp + 5;
    state.trendbox.T = state.trendbox.T + 10;

    this.setMergeState(state);
  }

  onUpdateProfile(result) {
    this.waitFor(SettingStore);

    if (result.length === 1) {
      const newProfile = result[0];
      const state = this.state.set('profile', newProfile);
      this.setMergeState(state.toJS());
    }
  }

  onSocketNoti(normalizedNoti) {
    let state = this.state.setIn(['notifications', 'INoti'], normalizedNoti);
    this.setMergeState(state.toJS());
  }

  onReadNoti(params) {
    let state = this.state.updateIn(['notifications', 'INoti', 'entities', 'notis', params.id.toString()], v => {
      return v
        .set('read', true)
        .set('read_at', new Date)
    });
    this.setState(state);
  }

  onFollowForum(result) {
    const state = this.state.update('follow_forums', list => list.push(Map(result)));
    this.setState(state);
  }

  onUnFollowForum(result) {
    const state = this.state.update('follow_forums', list => list.filterNot(v => v.get('id') === result.id));
    this.setState(state);
  }
}

export default alt.createStore(immutable(UserStore), UserStore.displayName);
