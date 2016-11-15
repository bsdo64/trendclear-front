import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import UserActions from '../../Actions/UserActions';
import { initListener, setMergeState } from '../Helper/func';

class ResetPasswordStore {
  static displayName = 'ResetPasswordStore';

  constructor() {
    this.displayName = 'ResetPasswordStore';

    this.bindActions(UserActions);
    this.state = Immutable.Map({
      error: null,
      requestFindEmail: null,
      userExist: null,
      resetEmailSent: null,
      isLoading: false
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onLoadRequestResetPassword() {
    this.setMergeState({
      isLoading: true,
      error: null,
      requestFindEmail: null,
      userExist: false,
    });
  }

  onRequestResetPassword(res) {
    if (res === null) {
      this.setMergeState({
        error: true,
        requestFindEmail: true,
        userExist: true,
        resetEmailSent: false,
        isLoading: false
      })

    } else if (res.result === 'ok') {
      this.setMergeState({
        error: null,
        requestFindEmail: true,
        userExist: false,
        resetEmailSent: true,
        isLoading: false
      })
    }
  }
}

export default alt.createStore(immutable(ResetPasswordStore), ResetPasswordStore.displayName);
