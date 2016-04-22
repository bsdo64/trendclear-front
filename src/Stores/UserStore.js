import alt from '../Utills/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class UserStore{
  constructor() {
    this.displayName = 'UserStore';

    this.bindActions(LoginActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onToggleLoginModal(open) {
    let state = this.state.set('openLoginModal', !open);
    this.setMergeState(state);
  }

  onCloseLoginModal() {
    let state = this.state.set('openLoginModal', false);
    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(UserStore));
