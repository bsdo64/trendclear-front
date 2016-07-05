import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../../Actions/LoginActions';
import { setMergeState } from '../Helper/func';

class LoginModalStore {
  constructor() {
    this.displayName = 'LoginModalStore';

    this.bindActions(LoginActions);
    this.state = Immutable.Map({
      openLoginModal: false,
      location: '/'
    });

    this.setMergeState = setMergeState.bind(this);
  }

  onToggleLoginModal(result) {
    let state = Map({
      openLoginModal: !result.opened,
      location: result.location
    });
    this.setMergeState(state);
  }

  onCloseLoginModal() {
    let state = this.state.set('openLoginModal', false);
    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(LoginModalStore), LoginModalStore.name);
