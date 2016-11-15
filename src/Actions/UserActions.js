import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import { normalize, arrayOf } from 'normalizr';
import { noti } from '../Model/normalizr/schema';

class UserActions {
  constructor() {
    this.generateActions('addList', 'socketPoint', 'toggleAvatarModal');
  }

  levelUp() {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/levelup')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  requestLogout() {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/logout')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  uploadAvatarImage(file) {
    return (dispatch) => {
      Api
        .setEntryPoint('/image')
        .postImg('/upload', file)
        .then((res) => {

          return Api
            .setEntryPoint('/ajax')
            .post('/user/avatarImg', { file: res.files[0] })
            .then((res2) => {
              return { file: res, user: res2 }
            })
        })
        .then((res) => {
          dispatch(res);

          this.toggleAvatarModal({
            contentType: 'AvatarImage'
          });
        })
        .catch((err) => {
          return err;
        });
    };
  }

  removeAvatarImage() {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .delete('/user/avatarImg')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }

  updatePassword(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/setting/password', params)
        .then(res => {
          dispatch(res);
        })
        .catch(err => {
          return err;
        })
    }
  }

  updateProfile(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/setting/profile', params)
        .then(res => {
          dispatch(res);
        })
        .catch(err => {
          return err;
        })
    }
  }

  socketNoti(data) {
    return normalize(data, arrayOf(noti))
  }

  readNoti(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .put('/user/noti/read', params)
        .then(() => {
          dispatch(params);
        })
        .catch(err => {
          return err;
        })
    }

  }

  followForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/forum/follow', params)
        .then(res => {
          if (res) {
            dispatch(res);
          }
        })
        .catch(err => {
          return err;
        })
    }
  }

  unFollowForum(params) {
    return (dispatch) => {
      Api
        .setEntryPoint('/ajax')
        .post('/user/forum/unfollow', params)
        .then(res => {
          if (res) {
            dispatch(res);
          }
        })
        .catch(err => {
          return err;
        })
    }
  }

  loadRequestResetPassword(params) {
    return (dispatch) => {
      dispatch();
      this.requestResetPassword(params);
    }
  }

  requestResetPassword(params) {
    return (dispatch) => {

      Api
        .setEntryPoint('/ajax')
        .post('/user/resetPassword', params)
        .then(res => {
          dispatch(res);
        })
        .catch(err => {
          return err;
        })
    }
  }
}

export default alt.createActions(UserActions);
