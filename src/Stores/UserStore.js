import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import UserActions from '../Actions/UserActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class UserStore{
  constructor() {
    this.displayName = 'UserStore';

    this.bindActions(AppActions);
    this.bindActions(UserActions);
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
    let state = this.state.updateIn(['trendbox', 'level'], val => val + 1);
    console.log(state.toJS());
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
      this.setMergeState(state);
    }
  }
}

export default alt.createStore(immutable(UserStore));
