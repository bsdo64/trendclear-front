/**
 * Created by dobyeongsu on 2016. 3. 25..
 */
import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class SigninActions {

  checkEmailDup(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
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
        .setType('/ajax')
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
    console.log(params);
    return (dispatch) => {
      Api
        .setType('/ajax')
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
        .setType('/ajax')
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
        .setType('/ajax')
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
