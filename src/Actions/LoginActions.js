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
  toggleLoginModal(openned, location) {
    return {opened: openned, location: location};
  }
  closeLoginModal() {
    return false;
  }

  sendLogin(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
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
