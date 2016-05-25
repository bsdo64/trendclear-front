import alt from '../Utils/alt';
import Api from '../Utils/ApiClient';

class UserActions {
  increaseLevel() {
    return true;
  }
  levelUp(params) {
    return (dispatch) => {
      Api
        .setType('/ajax')
        .post('/user/levelup', params)
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
}

export default alt.createActions(UserActions);
