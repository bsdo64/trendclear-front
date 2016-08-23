import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../Actions/UserActions';
import SettingActions from '../Actions/SettingActions';
import { initListener, setMergeState } from './Helper/func';

class SettingStore{
  static displayName = 'SettingStore';
  constructor() {

    this.bindActions(UserActions);
    this.bindActions(SettingActions);
    this.state = Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onUpdatePassword(result) {
    if (result.code === 1) {
      let state = this.state.set('error', '이전 비밀번호가 다릅니다');
      this.setMergeState(state)
    }

    if (result === 'ok') {
      let state = this.state.set('error', null);
      let successState = state.set('success', true);
      this.setMergeState(successState)
    }
  }

  onCloseMessage(payload) {
    let state = this.state.set(payload.type, null);
    this.setMergeState(state)
  }

  onUpdateProfile(result) {
    if (result.code === 1) {
      let state = this.state.set('error', '이전 비밀번호가 다릅니다');
      this.setMergeState(state)
    }

    if (result.length === 1) {
      let state = this.state.set('error', null);
      let successState = state.set('success', true);
      this.setMergeState(successState)
    }
  }
}

export default alt.createStore(immutable(SettingStore), SettingStore.displayName);
