import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';
import {normalize, arrayOf} from 'normalizr';
import {noti} from '../Model/normalizr/schema';

class UserActions {
  constructor() {
    this.generateActions('addList');
  }
  
  levelUp(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
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
        .setType('/ajax')
        .post('/logout')
        .then((res) => {
          dispatch(res);
        })
        .catch((err) => {
          return err;
        });
    };
  }
  openAvatarModalOpen() {
    return true;
  }

  closeAvatarModal() {
    return true;
  }
  uploadAvatarImage(file) {
    return (dispatch) => {
      Api
        .setType('/image')
        .postImg('/upload', file)
        .then((res) => {

          return Api
            .setType('/ajax')
            .post('/user/avatarImg', {file: res.files[0]})
            .then(() => {
              return res
            })
        })
        .then((res) => {
          dispatch(res);

          this.closeAvatarModal();
        })
        .catch((err) => {
          return err;
        });
    };
  }

  updatePassword(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
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
        .setType('/ajax')
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
        .setType('/ajax')
        .post('/user/noti/read', params)
        .then(res => {
          dispatch(params);
        })
        .catch(err => {
          return err;
        })
    }

  }
}

export default alt.createActions(UserActions);
