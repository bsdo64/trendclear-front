import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class LoginStore{
  constructor() {
    this.displayName = 'LoginStore';

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

export default alt.createStore(immutable(LoginStore));
