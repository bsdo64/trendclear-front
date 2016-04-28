import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class LoginActions {
  /**
   * 
   * Login Modal 
   * 
   * @param openned
   * @returns {*}
   */
  toggleLoginModal(openned) {
    console.log(openned);
    return openned;
  }
  closeLoginModal() {
    return false;
  }

  sendLogin(params) {
    return (dispatch) => {
      Api
        .post('/login', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(LoginActions);
