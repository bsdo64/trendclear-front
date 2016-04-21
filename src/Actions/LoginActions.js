import alt from '../Utills/alt';

class LoginActions {
  toggleLoginModal(openned) {
    return openned;
  }
  closeLoginModal() {
    return false;
  }
}

export default alt.createActions(LoginActions);
