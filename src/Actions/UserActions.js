import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class UserActions {
  increaseLevel() {
    return true;
  }
  requestLogout() {
    return (dispatch) => {
      Api
        .post('/logout')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(UserActions);
