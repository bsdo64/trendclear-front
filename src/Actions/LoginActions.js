import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class LoginActions {
  constructor() {
    this.generateActions('toggleLoginModal', 'closeLoginModal');
  }

  sendLogin(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
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
