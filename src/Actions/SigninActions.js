import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class SigninActions {
  constructor() {
    this.generateActions('agreeTerm', 'agreePrivacy', 'confirmAgree');
    this.generateActions('emailVerifyFormOpen');
    this.generateActions('resetForm');
  }

  checkEmailDup(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/signin/checkEmailDup', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  checkNickDup(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/signin/checkNickDup', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  submit(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/signin', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  requestEmailVerify(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/signin/requestEmailVerify', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  checkVerifyCode(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/signin/checkEmailCodeVerify', params)
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
}

export default alt.createActions(SigninActions);
